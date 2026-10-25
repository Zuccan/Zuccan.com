from typing import List, Dict, Any
from app.core.database import get_database
from app.models.business import BusinessInquiryModel
from app.schemas.business import BusinessInquiryCreate

class BusinessService:
    @staticmethod
    async def save_inquiry(inquiry_in: BusinessInquiryCreate) -> Dict[str, Any]:
        """Save a new B2B business inquiry to MongoDB."""
        db = get_database()
        doc = BusinessInquiryModel.create_document(inquiry_in.model_dump())
        if db is not None:
            result = await db[BusinessInquiryModel.COLLECTION_NAME].insert_one(doc)
            doc["id"] = str(result.inserted_id)
        else:
            doc["id"] = "mock_biz_id"
        return doc

    @staticmethod
    async def list_inquiries(limit: int = 50) -> List[Dict[str, Any]]:
        """Retrieve recent B2B business inquiries."""
        db = get_database()
        if db is None:
            return []
        cursor = db[BusinessInquiryModel.COLLECTION_NAME].find().sort("created_at", -1).limit(limit)
        inquiries = []
        async for item in cursor:
            item["id"] = str(item.pop("_id"))
            inquiries.append(item)
        return inquiries
