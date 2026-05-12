import os
from dataclasses import dataclass

from dotenv import load_dotenv


def _env(name: str) -> str:
    v = os.getenv(name)
    if not v:
        raise RuntimeError(f"Missing required env var: {name}")
    return v


@dataclass(frozen=True)
class Settings:
    supabase_url: str
    supabase_service_role_key: str

    openrouter_api_key: str
    base_url: str
    model_name: str

    max_questions_per_email_per_day: int


def get_settings() -> Settings:
    load_dotenv()

    return Settings(
        supabase_url=_env("SUPABASE_URL"),
        supabase_service_role_key=_env("SUPABASE_SERVICE_ROLE_KEY"),
        openrouter_api_key=_env("OPENROUTER_API_KEY"),
        base_url=_env("BASE_URL"),
        model_name=os.getenv("MODEL_NAME", "inclusionai/ring-2.6-1t:free"),
        max_questions_per_email_per_day=int(
            os.getenv("CHAT_MAX_QUESTIONS_PER_EMAIL_PER_DAY", "5")
        ),
    )
