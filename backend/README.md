# Zuccano Corporate Backend (FastAPI + MongoDB)

High-performance asynchronous backend service powering the Zuccano Parent Corporate portal, the Zuccano for Customers portal, and the Zuccano for Businesses portal.

## Tech Stack
- **Framework**: FastAPI (Python 3.12+)
- **Database**: MongoDB with `motor` (AsyncIO driver)
- **Validation**: Pydantic v2 & Pydantic-settings
- **Server**: Uvicorn ASGI

## Getting Started

### 1. Create Virtual Environment
```bash
python -m venv venv
# On Windows Powershell:
.\venv\Scripts\Activate.ps1
```

### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

### 3. Environment Variables
Copy `.env.example` to `.env` and configure your MongoDB connection string:
```bash
cp .env.example .env
```

### 4. Run Development Server
```bash
uvicorn app.main:app --reload --port 8000
```
Interactive Swagger API documentation will be available at:
`http://localhost:8000/docs`
