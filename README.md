# Zuccano — Parent Corporate Ecosystem

> The future of connected digital commerce & enterprise infrastructure.

Welcome to the **Zuccano** monorepo codebase. This repository houses the entire corporate web presence for the parent company, including dedicated child landing portals for **Customers** (B2C) and **Businesses** (B2B), powered by an asynchronous **Python FastAPI + MongoDB** backend.

---

## 🏗️ Architecture & Tech Stack

```
                          ┌────────────────────────┐
                          │     Zuccano Parent     │
                          │   (Corporate Group)    │
                          └───────────┬────────────┘
                                      │
                 ┌────────────────────┴────────────────────┐
                 │                                         │
                 ▼                                         ▼
   ┌───────────────────────────┐             ┌───────────────────────────┐
   │   Zuccano for Customers   │             │   Zuccano for Business    │
   │      (B2C Portal)         │             │      (B2B Enterprise)     │
   └─────────────┬─────────────┘             └─────────────┬─────────────┘
                 │                                         │
                 └────────────────────┬────────────────────┘
                                      │
                                      ▼
                      ┌───────────────────────────────┐
                      │    FastAPI Python Backend     │
                      │    (Motor AsyncIO + MongoDB)  │
                      └───────────────────────────────┘
```

### Frontend Stack
- **Framework**: React 19 + Vite
- **Animations**: Framer Motion
- **Kinetic & Text Effects**: GSAP (GreenSock)
- **Smooth Scroll**: Locomotive Scroll & Lenis Engine
- **Icons**: Lucide React
- **Styling**: Modular Vanilla CSS with design token variables & glassmorphism

### Backend Stack
- **Framework**: Python 3.12+ FastAPI
- **Database**: MongoDB with Motor (AsyncIO driver)
- **Validation**: Pydantic v2 & Pydantic-settings
- **ASGI Server**: Uvicorn

---

## 📁 Repository Directory Structure

```
d:/Zucanoo/
├── docker-compose.yml             # Local multi-container orchestrator (Mongo + Backend + Frontend)
├── .gitignore                     # Monorepo git ignore rules
├── README.md                      # Corporate project documentation
│
├── frontend/                      # React + Vite Web Application
│   ├── index.html                 # App HTML shell with Google Fonts & SEO tags
│   ├── package.json               # Node dependencies
│   ├── vite.config.js             # Vite build configuration
│   └── src/
│       ├── assets/                # Media, vectors, brand assets
│       ├── styles/                # Design tokens & styles
│       │   ├── variables.css      # CSS variables (palettes, glows, typography)
│       │   ├── globals.css        # Base styles, resets, glassmorphism utilities
│       │   └── animations.css     # Keyframes and micro-animations
│       ├── utils/
│       │   ├── constants.js       # Brand, portals & navigation definitions
│       │   └── motionVariants.js  # Framer Motion animation presets
│       ├── hooks/
│       │   ├── useLocomotive.js   # Lenis / Locomotive smooth scroll hook
│       │   ├── useGsapText.js     # GSAP word split-reveal text animation
│       │   └── useMousePosition.js# Cursor & spotlight coordinate tracker
│       ├── services/
│       │   └── api.js             # HTTP client connecting to FastAPI backend
│       ├── context/
│       │   └── NavigationContext.jsx # Current portal state & mobile drawer
│       ├── layouts/
│       │   └── MainLayout.jsx     # Master layout: Navbar, SmoothScroll, Cursor, Footer
│       ├── components/
│       │   ├── common/            # Reusable UI components
│       │   │   ├── Navbar/        # Dynamic multi-portal navigation bar
│       │   │   ├── Footer/        # Corporate ecosystem footer
│       │   │   ├── Button/        # Magnetic button with glow effects
│       │   │   ├── CustomCursor/  # Interactive fluid cursor follower
│       │   │   ├── GlowCard/      # Spotlight glass card following mouse
│       │   │   └── PortalSwitcher/# Pill switcher (Group / Customers / Business)
│       │   ├── effects/           # Animation components
│       │   │   ├── TextReveal/    # GSAP character & word stagger reveal
│       │   │   └── Marquee/       # Infinite velocity ticker banner
│       │   ├── parent/            # Corporate Parent Website components
│       │   │   ├── Hero/          # Parent vision hero
│       │   │   ├── Ecosystem/     # Dual pillar overview (Customers & Business)
│       │   │   └── StatsSection/  # Key GMV & scale metrics
│       │   ├── customers/         # Zuccano for Customers components
│       │   │   └── CustomerHero/  # B2C hero with VIP waitlist & phone mockup
│       │   └── business/          # Zuccano for Business components
│       │       ├── BusinessHero/  # Enterprise B2B hero & SLA metrics
│       │       └── PartnerInquiryForm/ # B2B lead capture (connected to FastAPI)
│       ├── pages/
│       │   ├── ParentHome/        # Route `/` (Main Corporate Group)
│       │   ├── Customers/         # Route `/customers` (B2C Landing)
│       │   ├── Business/          # Route `/business` (B2B Landing)
│       │   └── NotFound/          # Route `*` (404 Fallback)
│       ├── App.jsx                # Router & Provider configuration
│       └── main.jsx               # React entrypoint
│
└── backend/                       # Python FastAPI Backend
    ├── requirements.txt           # Python dependencies (FastAPI, Motor, Pydantic)
    ├── .env.example               # Environment variables template
    ├── Dockerfile                 # Backend container definition
    └── app/
        ├── main.py                # FastAPI app initialization, CORS, lifespan
        ├── core/
        │   ├── config.py          # Pydantic Settings configuration
        │   ├── database.py        # Async Motor MongoDB connection manager
        │   └── security.py        # Token generation & security helpers
        ├── models/                # MongoDB document specifications
        │   ├── customer.py        # Customer leads collection schema
        │   ├── business.py        # B2B partnership inquiries collection
        │   └── contact.py         # Corporate contact messages collection
        ├── schemas/               # Pydantic validation schemas
        │   ├── customer.py        # Customer request & response models
        │   ├── business.py        # Business request & response models
        │   ├── contact.py         # Contact form request models
        │   └── response.py        # Standard API envelope response model
        ├── services/              # Business logic layer
        │   ├── customer_service.py# Customer database operations
        │   ├── business_service.py# Enterprise lead database operations
        │   └── email_service.py   # Notification dispatch service
        ├── utils/
        │   ├── logger.py          # Structured stdout logger
        │   └── helpers.py         # Utility functions
        └── api/
            ├── router.py          # Aggregated API router
            └── v1/
                └── endpoints/
                    ├── health.py  # Healthcheck & DB ping endpoint
                    ├── customers.py # Customer inquiry endpoints
                    ├── business.py  # B2B partnership endpoints
                    └── contact.py   # Corporate contact endpoints
```

---

## 🚀 Running the Project

### 1. Run Everything with Docker (Recommended)
```bash
docker-compose up --build
```
- **Frontend**: `http://localhost:5173`
- **FastAPI Backend**: `http://localhost:8000`
- **FastAPI Interactive Docs**: `http://localhost:8000/docs`
- **MongoDB**: `localhost:27017`

### 2. Run Frontend Independently
```bash
cd frontend
npm install
npm run dev
```

### 3. Run Backend Independently
```bash
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1   # On Windows
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload --port 8000
```
