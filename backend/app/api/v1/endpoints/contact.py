from fastapi import APIRouter, HTTPException, status
from app.schemas.contact import ContactMessageCreate
from app.schemas.response import ApiResponse
from app.core.database import get_database
from app.models.contact import ContactMessageModel

router = APIRouter()

@router.post("/message", response_model=ApiResponse, status_code=status.HTTP_201_CREATED)
async def submit_contact_message(payload: ContactMessageCreate):
    """Submit a corporate contact message for Zuccano Group."""
    try:
        db = get_database()
        doc = ContactMessageModel.create_document(payload.model_dump())
        if db is not None:
            res = await db[ContactMessageModel.COLLECTION_NAME].insert_one(doc)
            doc_id = str(res.inserted_id)
        else:
            doc_id = "mock_contact_id"
        return ApiResponse(
            success=True,
            message="Your message has been sent to Zuccano corporate relations.",
            data={"id": doc_id}
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to submit message: {str(e)}"
        )
