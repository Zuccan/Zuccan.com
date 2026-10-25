from fastapi import APIRouter, HTTPException, status
from app.schemas.business import BusinessInquiryCreate
from app.schemas.response import ApiResponse
from app.services.business_service import BusinessService

router = APIRouter()

@router.post("/partner-inquiry", response_model=ApiResponse, status_code=status.HTTP_201_CREATED)
async def create_business_inquiry(payload: BusinessInquiryCreate):
    """Submit a B2B enterprise / partnership inquiry."""
    try:
        created = await BusinessService.save_inquiry(payload)
        return ApiResponse(
            success=True,
            message="Thank you! Our enterprise partnership team will contact you within 24 hours.",
            data={"id": str(created.get("id"))}
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to submit business inquiry: {str(e)}"
        )

@router.get("/inquiries", response_model=ApiResponse)
async def list_business_inquiries(limit: int = 50):
    """List recent B2B partnership inquiries (admin access)."""
    inquiries = await BusinessService.list_inquiries(limit=limit)
    return ApiResponse(
        success=True,
        message="Fetched business inquiries successfully",
        data=inquiries,
        meta={"total": len(inquiries)}
    )
