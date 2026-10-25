from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime

class CustomerLeadCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100, description="Customer full name")
    email: EmailStr = Field(..., description="Customer email address")
    phone: Optional[str] = Field(None, max_length=20, description="Contact phone number")
    interest: Optional[str] = Field("general", description="Product or service of interest")
    feedback: Optional[str] = Field(None, max_length=1000, description="Customer message or feedback")

class CustomerLeadResponse(CustomerLeadCreate):
    id: str
    created_at: datetime
    status: str = "new"

    class Config:
        from_attributes = True
