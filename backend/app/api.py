from __future__ import annotations

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field

from agents import Runner

from .agent import create_agent
from .config import get_settings
from .db import (
    count_user_messages_today_for_email,
    create_supabase_client,
    get_chat_session,
    increment_session_questions_used,
    insert_chat_message,
    insert_chat_session,
)

settings = get_settings()

supabase = create_supabase_client(settings)
agent = create_agent(settings)

app = FastAPI(title="Portfolio Chat Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ChatStartRequest(BaseModel):
    name: str = Field(min_length=1, max_length=80)
    email: EmailStr
    subject: str | None = Field(default=None, max_length=120)


class ChatStartResponse(BaseModel):
    session_id: str
    remaining: int


class ChatMessageRequest(BaseModel):
    session_id: str
    message: str = Field(min_length=1, max_length=2000)


class ChatMessageResponse(BaseModel):
    reply: str
    remaining: int


_PORTFOLIO_CACHE: dict[str, object] | None = None
_PORTFOLIO_CACHE_AT: float | None = None


def _portfolio_context() -> str:
    import json
    import time

    ttl_seconds = 60 * 30
    now = time.time()

    global _PORTFOLIO_CACHE
    global _PORTFOLIO_CACHE_AT

    if _PORTFOLIO_CACHE is not None and _PORTFOLIO_CACHE_AT is not None:
        if now - _PORTFOLIO_CACHE_AT < ttl_seconds:
            portfolio_json = json.dumps(_PORTFOLIO_CACHE, separators=(",", ":"), ensure_ascii=False)
            return _format_portfolio_context(portfolio_json)

    if not settings.portfolio_data_url:
        return "Portfolio context unavailable (PORTFOLIO_DATA_URL not set)."

    try:
        from urllib.request import Request, urlopen

        req = Request(
            settings.portfolio_data_url,
            headers={
                "User-Agent": "portfolio-chat-backend/1.0",
                "Accept": "application/json",
            },
        )

        with urlopen(req, timeout=10) as resp:
            raw = resp.read().decode("utf-8")
            data = json.loads(raw)

        _PORTFOLIO_CACHE = data
        _PORTFOLIO_CACHE_AT = now

        portfolio_json = json.dumps(data, separators=(",", ":"), ensure_ascii=False)
        return _format_portfolio_context(portfolio_json)
    except Exception as e:
        return f"Portfolio context unavailable (failed to fetch): {type(e).__name__}"


def _format_portfolio_context(portfolio_json: str) -> str:
    context = f"""=== PORTFOLIO DATA FOR OSAMA BIN ADNAN ===

Below is the complete portfolio data in JSON format. Use this data to answer questions about Osama's professional background.

PORTFOLIO_JSON:
{portfolio_json}

=== INSTRUCTIONS ===
- Parse the JSON to find relevant information
- For contact info: check profile.socials array
- For work history: check experience array (sorted by recency)
- For projects: check projects array with full descriptions and tech stacks
- For technologies: check techStack array (grouped by category)
- Always provide specific details from the data when available
- If information is not in the JSON, say you don't have that information in the portfolio context

Answer the user's question using only this portfolio data."""

    return context


# Warm the cache best-effort at import time
try:
    _portfolio_context()
except Exception:
    pass






@app.get("/")
def root():
    return {
        "name": "Portfolio Chat Backend",
        "version": "1.0.0",
        "description": "AI-powered chatbot backend for Osama bin Adnan's portfolio",
        "endpoints": {
            "health": "/health",
            "docs": "/docs",
            "redoc": "/redoc",
            "chat_start": "POST /chat/start",
            "chat_message": "POST /chat/message"
        },
        "features": [
            "OpenAI Agents SDK with OpenRouter",
            "Supabase database integration",
            "3 questions per email per day limit",
            "Session-based chat management"
        ]
    }


@app.get("/health")
def health():
    return {"ok": True}


@app.post("/chat/start", response_model=ChatStartResponse)
def chat_start(payload: ChatStartRequest):
    session_id = insert_chat_session(
        supabase,
        name=payload.name.strip(),
        email=str(payload.email).strip().lower(),
        subject=(payload.subject.strip() if payload.subject else None),
        max_questions=settings.max_questions_per_email_per_day,
    )

    return ChatStartResponse(
        session_id=session_id,
        remaining=settings.max_questions_per_email_per_day,
    )


@app.post("/chat/message", response_model=ChatMessageResponse)
def chat_message(payload: ChatMessageRequest):
    session = get_chat_session(supabase, session_id=payload.session_id)
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")

    if session.get("status") != "active":
        raise HTTPException(status_code=403, detail="Session is not active")

    email = session.get("email")
    if not email:
        raise HTTPException(status_code=500, detail="Session missing email")

    used_today = count_user_messages_today_for_email(supabase, email=email)
    remaining = settings.max_questions_per_email_per_day - used_today
    if remaining <= 0:
        raise HTTPException(status_code=403, detail="Daily limit reached")

    insert_chat_message(
        supabase,
        session_id=payload.session_id,
        role="user",
        content=payload.message,
    )

    # Increment questions_used counter
    increment_session_questions_used(supabase, session_id=payload.session_id)

    prompt = f"{_portfolio_context()}\n\nUser: {payload.message}".strip()
    result = Runner.run_sync(agent, prompt)
    reply = result.final_output or "Sorry, I couldn't generate a response."

    # Strip <thought> tags from Agent responses
    import re
    reply = re.sub(r'<thought>.*?</thought>', '', reply, flags=re.DOTALL).strip()

    insert_chat_message(
        supabase,
        session_id=payload.session_id,
        role="assistant",
        content=reply,
    )

    return ChatMessageResponse(reply=reply, remaining=remaining - 1)
