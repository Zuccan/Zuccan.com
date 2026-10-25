from datetime import datetime, timezone
from typing import Any, Dict

def utc_now() -> datetime:
    """Return current UTC datetime with timezone info."""
    return datetime.now(timezone.utc)

def sanitize_dict(data: Dict[str, Any]) -> Dict[str, Any]:
    """Strip string values in dictionary."""
    sanitized = {}
    for k, v in data.items():
        if isinstance(v, str):
            sanitized[k] = v.strip()
        else:
            sanitized[k] = v
    return sanitized
