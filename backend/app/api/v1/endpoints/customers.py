from fastapi import APIRouter, HTTPException, status
from app.schemas.customer import CustomerLeadCreate
from app.schemas.response import ApiResponse
from app.services.customer_service import CustomerService

router = APIRouter()

@router.post("/inquiry", response_model=ApiResponse, status_code=status.HTTP_201_CREATED)
async def create_customer_lead(payload: CustomerLeadCreate):
    """Submit a customer inquiry or early access waitlist request."""
    try:
        created = await CustomerService.save_lead(payload)
        return ApiResponse(
            success=True,
            message="Thank you for your interest! Our team will get in touch with you shortly.",
            data={"id": str(created.get("id"))}
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to submit customer inquiry: {str(e)}"
        )

@router.get("/inquiries", response_model=ApiResponse)
async def list_customer_inquiries(limit: int = 50):
    """List recent customer inquiries (admin access)."""
    leads = await CustomerService.list_leads(limit=limit)
    return ApiResponse(
        success=True,
        message="Fetched customer leads successfully",
        data=leads,
        meta={"total": len(leads)}
    )
