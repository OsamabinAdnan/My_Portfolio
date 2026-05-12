from __future__ import annotations

from datetime import datetime, timezone
from typing import Any

from supabase import Client, create_client

from .config import Settings


def create_supabase_client(settings: Settings) -> Client:
    return create_client(settings.supabase_url, settings.supabase_service_role_key)


def utc_today_start_iso() -> str:
    now = datetime.now(timezone.utc)
    start = datetime(year=now.year, month=now.month, day=now.day, tzinfo=timezone.utc)
    return start.isoformat()


def insert_chat_session(
    supabase: Client, *, name: str, email: str, subject: str | None, max_questions: int
) -> str:
    res = (
        supabase.table("chat_sessions")
        .insert(
            {
                "name": name,
                "email": email,
                "subject": subject,
                "questions_used": 0,
                "max_questions": max_questions,
                "status": "active",
            }
        )
        .execute()
    )

    if not res.data or not res.data[0].get("id"):
        raise RuntimeError("Failed to create chat session")

    return res.data[0]["id"]


def get_chat_session(supabase: Client, *, session_id: str) -> dict[str, Any] | None:
    res = (
        supabase.table("chat_sessions")
        .select("id,email,max_questions,status")
        .eq("id", session_id)
        .limit(1)
        .execute()
    )
    return res.data[0] if res.data else None


def get_session_ids_for_email(supabase: Client, *, email: str) -> list[str]:
    res = supabase.table("chat_sessions").select("id").eq("email", email).execute()
    return [r["id"] for r in (res.data or []) if r.get("id")]


def count_user_messages_today_for_email(supabase: Client, *, email: str) -> int:
    session_ids = get_session_ids_for_email(supabase, email=email)
    if not session_ids:
        return 0

    today_start = utc_today_start_iso()

    # Supabase PostgREST supports 'in' filter and 'gte' for timestamps.
    res = (
        supabase.table("chat_messages")
        .select("id", count="exact")
        .in_("session_id", session_ids)
        .eq("role", "user")
        .gte("created_at", today_start)
        .execute()
    )

    return int(res.count or 0)


def insert_chat_message(
    supabase: Client, *, session_id: str, role: str, content: str
) -> None:
    supabase.table("chat_messages").insert(
        {"session_id": session_id, "role": role, "content": content}
    ).execute()


def increment_session_questions_used(supabase: Client, *, session_id: str) -> None:
    """Increment the questions_used counter for a session"""
    supabase.rpc("increment_questions_used", {"session_id_param": session_id}).execute()
