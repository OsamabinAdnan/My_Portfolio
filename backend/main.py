"""
Portfolio Chat Backend - Main Entry Point

AI-powered chatbot backend for Osama bin Adnan's portfolio.

Features:
- OpenAI Agents SDK with OpenRouter
- Supabase database integration
- 3 questions per email per day limit
- Session-based chat management

Endpoints:
- GET  /          - API information
- GET  /health    - Health check
- GET  /docs      - Swagger UI documentation
- GET  /redoc     - ReDoc documentation
- POST /chat/start   - Start a new chat session
- POST /chat/message - Send a message in an existing session

Run with:
  uvicorn main:app --reload --port 8000
"""

from app.api import app

__version__ = "1.0.0"
