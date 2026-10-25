from fastapi import APIRouter
from app.core.config import settings
from app.core.database import get_database

router = APIRouter()

@router.get("/health", summary="API Health Check")
async def health_check():
    db = get_database()
    db_connected = False
    if db is not None:
        try:
            await db.command("ping")
            db_connected = True
        except Exception:
            db_connected = False

    return {
        "status": "healthy",
        "service": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "database_connected": db_connected
    }
