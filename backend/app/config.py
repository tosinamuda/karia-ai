import os

from dotenv import load_dotenv

load_dotenv()


class Config:
    def __init__(self) -> None:
        pass

    @property
    def cors_allowed_origin_regex(self) -> str | None:
        return os.getenv("CORS_ALLOWED_ORIGIN_REGEX")

    @property
    def is_production(self) -> bool:
        return os.getenv("APP_ENV") == "production"

    @property
    def is_development(self) -> bool:
        return os.getenv("APP_ENV") == "development"

    @property
    def port(self) -> int:
        return int(os.getenv("PORT", "8000"))
