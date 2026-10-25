from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime

class ContactMessageCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    subject: str = Field(..., min_length=3, max_length=150)
    department: Optional[str] = Field("general", description="investor_relations, press, careers, corporate")
    message: str = Field(..., min_length=10, max_length=3000)

class ContactMessageResponse(ContactMessageCreate):
    id: str
    created_at: datetime
    is_read: bool = False

    class Config:
        from_attributes = True
