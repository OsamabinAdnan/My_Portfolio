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


def _portfolio_context() -> str:
    import json
    from pathlib import Path

    data_path = Path(__file__).parent.parent.parent / "frontend" / "lib" / "data" / "data.json"

    try:
        with open(data_path, "r", encoding="utf-8") as f:
            data = json.load(f)
    except Exception:
        return "Portfolio data is currently unavailable."

    # Convert to formatted JSON string
    portfolio_json = json.dumps(data, indent=2)

    context = f"""=== PORTFOLIO DATA FOR OSAMA BIN ADNAN ===

Below is the complete portfolio data in JSON format. Use this data to answer questions about Osama's professional background.

```json
{portfolio_json}
```

=== INSTRUCTIONS ===
- Parse the JSON to find relevant information
- The data includes: profile, techStack, projects, experience, agents, services, blog
- For contact info: check profile.socials array
- For work history: check experience array (sorted by recency)
- For projects: check projects array with full descriptions and tech stacks
- For technologies: check techStack array (grouped by category: frontend, backend, devops, digital-marketing, ai, others)
- Always provide specific details from the data when available
- If information is not in the JSON, say you don't have that information

Answer the user's question using only this portfolio data."""

    return context


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
