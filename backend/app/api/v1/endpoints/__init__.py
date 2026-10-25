from app.api.v1.endpoints.health import router as health_router
from app.api.v1.endpoints.customers import router as customers_router
from app.api.v1.endpoints.business import router as business_router
from app.api.v1.endpoints.contact import router as contact_router

__all__ = ["health_router", "customers_router", "business_router", "contact_router"]
