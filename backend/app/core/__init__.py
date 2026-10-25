# Core application configuration and services
from app.core.config import settings
from app.core.database import get_database

__all__ = ["settings", "get_database"]
