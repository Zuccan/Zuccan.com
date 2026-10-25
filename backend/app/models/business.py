from datetime import datetime, timezone
from typing import Optional, Dict, Any

class BusinessInquiryModel:
    COLLECTION_NAME = "business_inquiries"

    @staticmethod
    def create_document(data: Dict[str, Any]) -> Dict[str, Any]:
        """Format B2B inquiry document for MongoDB insertion."""
        now = datetime.now(timezone.utc)
        return {
            "company_name": data.get("company_name"),
            "contact_name": data.get("contact_name"),
            "business_email": data.get("business_email"),
            "phone": data.get("phone"),
            "company_size": data.get("company_size", "1-10"),
            "solution_interest": data.get("solution_interest", "Enterprise Partnership"),
            "project_budget": data.get("project_budget"),
            "message": data.get("message"),
            "status": "pending_review",
            "source": "zucano_business_landing",
            "created_at": now,
            "updated_at": now
        }
