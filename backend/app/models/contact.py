from datetime import datetime, timezone
from typing import Optional, Dict, Any

class ContactMessageModel:
    COLLECTION_NAME = "contact_messages"

    @staticmethod
    def create_document(data: Dict[str, Any]) -> Dict[str, Any]:
        """Format contact message document for MongoDB insertion."""
        now = datetime.now(timezone.utc)
        return {
            "name": data.get("name"),
            "email": data.get("email"),
            "subject": data.get("subject"),
            "department": data.get("department", "general"),
            "message": data.get("message"),
            "is_read": False,
            "created_at": now
        }
