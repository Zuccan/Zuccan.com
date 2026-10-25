from datetime import datetime, timezone
from typing import Optional, Dict, Any

class CustomerModel:
    COLLECTION_NAME = "customer_leads"

    @staticmethod
    def create_document(data: Dict[str, Any]) -> Dict[str, Any]:
        """Format document before inserting into MongoDB."""
        now = datetime.now(timezone.utc)
        return {
            "name": data.get("name"),
            "email": data.get("email"),
            "phone": data.get("phone"),
            "interest": data.get("interest", "general"),
            "feedback": data.get("feedback"),
            "status": "new",
            "source": "zucano_customers_landing",
            "created_at": now,
            "updated_at": now
        }
