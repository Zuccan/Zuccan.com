from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime

class BusinessInquiryCreate(BaseModel):
    company_name: str = Field(..., min_length=2, max_length=150, description="Company or Organization Name")
    contact_name: str = Field(..., min_length=2, max_length=100, description="Contact person full name")
    business_email: EmailStr = Field(..., description="Official work email")
    phone: Optional[str] = Field(None, max_length=25, description="Work phone")
    company_size: Optional[str] = Field("1-10", description="Company size bracket (e.g. 1-10, 11-50, 50-200, 200+)")
    solution_interest: Optional[str] = Field("Enterprise Partnership", description="Type of business solution or partnership")
    project_budget: Optional[str] = Field(None, description="Estimated budget or tier")
    message: Optional[str] = Field(None, max_length=2000, description="Project goals and requirements")

class BusinessInquiryResponse(BusinessInquiryCreate):
    id: str
    created_at: datetime
    status: str = "pending_review"

    class Config:
        from_attributes = True
