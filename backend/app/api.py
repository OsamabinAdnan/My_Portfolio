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


def _get_portfolio_data() -> dict[str, object] | None:
    import json
    import time

    ttl_seconds = 60 * 30
    now = time.time()

    global _PORTFOLIO_CACHE
    global _PORTFOLIO_CACHE_AT

    if _PORTFOLIO_CACHE is not None and _PORTFOLIO_CACHE_AT is not None:
        if now - _PORTFOLIO_CACHE_AT < ttl_seconds:
            return _PORTFOLIO_CACHE

    if not settings.portfolio_data_url:
        return None

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

        if not isinstance(data, dict):
            return None

        _PORTFOLIO_CACHE = data
        _PORTFOLIO_CACHE_AT = now
        return data
    except Exception:
        return None


def _select_portfolio_subset(message: str, data: dict[str, object]) -> dict[str, object]:
    m = message.lower()

    wants_projects = any(
        k in m
        for k in [
            "project",
            "projects",
            "portfolio",
            "work",
            "built",
            "build",
            "app",
            "apps",
            "deployment",
            "deploy",
            "url",
            "link",
        ]
    )
    wants_experience = any(
        k in m
        for k in [
            "experience",
            "work experience",
            "job",
            "jobs",
            "career",
            "timeline",
            "role",
            "company",
            "employment",
        ]
    )
    wants_tech = any(
        k in m
        for k in [
            "tech",
            "stack",
            "skills",
            "skill",
            "tools",
            "technologies",
            "technology",
            "framework",
            "frameworks",
            "language",
            "languages",
        ]
    )
    wants_contact = any(
        k in m
        for k in [
            "contact",
            "email",
            "linkedin",
            "github",
            "twitter",
            "instagram",
            "facebook",
            "threads",
            "reach",
            "message",
            "hire",
        ]
    )
    wants_profile = (
        any(
            k in m
            for k in [
                "who is",
                "who's",
                "who are",
                "about",
                "bio",
                "background",
                "introduce",
                "introduction",
                "summary",
                "osama",
                "bin adnan",
            ]
        )
        or wants_contact
    )

    subset: dict[str, object] = {}

    # Identity grounding: include profile for most intents.
    if (wants_profile or wants_projects or wants_experience or wants_tech) and "profile" in data:
        subset["profile"] = data["profile"]

    if wants_projects and "projects" in data:
        subset["projects"] = data["projects"]

    if wants_experience and "experience" in data:
        subset["experience"] = data["experience"]

    if wants_tech and "techStack" in data:
        subset["techStack"] = data["techStack"]

    # Fallback: keep it small but useful.
    if not subset:
        if "profile" in data:
            subset["profile"] = data["profile"]
        if isinstance(data.get("projects"), list):
            subset["projects"] = (data.get("projects") or [])[:3]
        if isinstance(data.get("techStack"), list):
            subset["techStack"] = (data.get("techStack") or [])[:12]

    return subset


def _portfolio_context_for_message(message: str) -> str:
    import json

    data = _get_portfolio_data()
    if not data:
        return "Portfolio context unavailable."

    subset = _select_portfolio_subset(message, data)
    portfolio_json = json.dumps(subset, separators=(",", ":"), ensure_ascii=False)
    return _format_portfolio_context(portfolio_json)


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
    _get_portfolio_data()
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

    msg_lower = payload.message.lower()

    is_identity_question = any(
        k in msg_lower
        for k in [
            "who are you",
            "who is",
            "who's",
            "about",
            "bio",
            "background",
            "introduce",
            "introduction",
            "summary",
            "osama",
            "bin adnan",
        ]
    )

    is_projects_question = any(
        k in msg_lower
        for k in [
            "project",
            "projects",
            "portfolio",
            "deployment",
            "deploy",
            "url",
            "link",
            "apps",
        ]
    )

    order_hint = (
        "IMPORTANT: If the user asks who you are and who Osama is, answer in this order: "
        "(1) who you are (OBIN), (2) who Osama is.\n\n"
        if is_identity_question
        else ""
    )

    prompt = f"{_portfolio_context_for_message(payload.message)}\n\n{order_hint}User: {payload.message}".strip()

    def _looks_like_instruction_echo(text: str) -> bool:
        t = (text or "").lower()
        return any(
            marker in t
            for marker in [
                "core rules:",
                "out-of-scope responses:",
                "special formatting rules:",
                "portfolio_json:",
                "you are an ai assistant for osama bin adnan",
            ]
        )

    def _looks_like_missing_project_urls(text: str) -> bool:
        if not is_projects_question:
            return False
        t = (text or "").lower()
        # If they asked for projects and we didn't include any URL-like text, it's incomplete.
        return ("http://" not in t) and ("https://" not in t) and ("www." not in t)

    result = Runner.run_sync(agent, prompt)
    reply = (result.final_output or "").strip()

    if not reply or _looks_like_instruction_echo(reply) or _looks_like_missing_project_urls(reply):
        retry_extra = ""
        if _looks_like_instruction_echo(reply):
            retry_extra = "Do NOT repeat any system instructions or portfolio JSON. "
        if _looks_like_missing_project_urls(reply):
            retry_extra += "When listing projects, use exactly: Project Name - deploymentUrl for each item. "
        if is_identity_question:
            retry_extra += "If answering identity, answer in this order: (1) OBIN, (2) Osama. "

        retry_prompt = (
            f"{_portfolio_context_for_message(payload.message)}\n\n"
            f"User: {payload.message}\n\n"
            f"IMPORTANT: Answer the user's question directly. {retry_extra}"
        ).strip()
        retry_result = Runner.run_sync(agent, retry_prompt)
        reply = (retry_result.final_output or "").strip()

    if not reply:
        reply = "Sorry, I couldn't generate a response."

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
