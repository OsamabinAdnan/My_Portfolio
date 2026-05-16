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
    model_fallbacks: list[str]

    max_questions_per_email_per_day: int

    portfolio_data_url: str | None


def get_settings() -> Settings:
    load_dotenv()

    model_name = os.getenv("MODEL_NAME", "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free")
    fallbacks_raw = os.getenv(
        "MODEL_FALLBACKS",
        "google/gemma-4-26b-a4b-it:free,arcee-ai/trinity-large-thinking:free",
    )

    model_fallbacks = [m.strip() for m in fallbacks_raw.split(",") if m.strip()]

    return Settings(
        supabase_url=_env("SUPABASE_URL"),
        supabase_service_role_key=_env("SUPABASE_SERVICE_ROLE_KEY"),
        openrouter_api_key=_env("OPENROUTER_API_KEY"),
        base_url=_env("BASE_URL"),
        model_name=model_name,
        model_fallbacks=model_fallbacks,
        max_questions_per_email_per_day=int(
            os.getenv("CHAT_MAX_QUESTIONS_PER_EMAIL_PER_DAY", "5")
        ),
        portfolio_data_url=os.getenv("PORTFOLIO_DATA_URL"),
    )



def get_model_candidates(settings: Settings) -> list[str]:
    return [settings.model_name, *settings.model_fallbacks]



def is_transient_provider_error(exc: Exception) -> bool:
    msg = str(exc)
    needles = [
        "Upstream idle timeout",
        "Provider returned error",
        "'code': 502",
        "'code': 524",
        '"code": 502',
        '"code": 524',
    ]
    return any(n in msg for n in needles)

