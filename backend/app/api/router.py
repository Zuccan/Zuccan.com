from fastapi import APIRouter
from app.api.v1.endpoints.health import router as health_router
from app.api.v1.endpoints.customers import router as customers_router
from app.api.v1.endpoints.business import router as business_router
from app.api.v1.endpoints.contact import router as contact_router

api_router = APIRouter()

api_router.include_router(health_router, tags=["System Health"])
api_router.include_router(customers_router, prefix="/customers", tags=["Customers Portal"])
api_router.include_router(business_router, prefix="/business", tags=["Business Portal"])
api_router.include_router(contact_router, prefix="/contact", tags=["Corporate Relations"])
