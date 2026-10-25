from typing import List, Dict, Any
from app.core.database import get_database
from app.models.customer import CustomerModel
from app.schemas.customer import CustomerLeadCreate

class CustomerService:
    @staticmethod
    async def save_lead(lead_in: CustomerLeadCreate) -> Dict[str, Any]:
        """Save a new customer lead to MongoDB."""
        db = get_database()
        doc = CustomerModel.create_document(lead_in.model_dump())
        if db is not None:
            result = await db[CustomerModel.COLLECTION_NAME].insert_one(doc)
            doc["id"] = str(result.inserted_id)
        else:
            # Fallback mock for offline / testing without live db
            doc["id"] = "mock_cust_id"
        return doc

    @staticmethod
    async def list_leads(limit: int = 50) -> List[Dict[str, Any]]:
        """Retrieve recent customer leads."""
        db = get_database()
        if db is None:
            return []
        cursor = db[CustomerModel.COLLECTION_NAME].find().sort("created_at", -1).limit(limit)
        leads = []
        async for item in cursor:
            item["id"] = str(item.pop("_id"))
            leads.append(item)
        return leads
