"""Security utilities and API key/rate limiting helpers."""
import hashlib
import secrets

def generate_random_token(length: int = 32) -> str:
    """Generate a cryptographically secure random token."""
    return secrets.token_hex(length)

def hash_string(value: str) -> str:
    """Generate SHA256 hash."""
    return hashlib.sha256(value.encode()).hexdigest()
