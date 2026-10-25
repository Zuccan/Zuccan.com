import logging

logger = logging.getLogger(__name__)

class EmailService:
    @staticmethod
    async def send_welcome_email(to_email: str, recipient_name: str, inquiry_type: str = "customer"):
        """Send confirmation email to user after submitting inquiry."""
        logger.info(
            "Mock dispatching email to %s (%s) for inquiry type: %s",
            to_email, recipient_name, inquiry_type
        )
        # Production ready placeholder for SMTP / Sendgrid / AWS SES
        return True
