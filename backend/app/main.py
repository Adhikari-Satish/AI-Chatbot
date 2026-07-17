from fastapi import FastAPI
from app.core.config import settings

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.VERSION
    )


@app.get("/")
def home():
    return {
        "message": "Welcome to AI-Chatbot",
        "version": settings.VERSION
    }


@app.get("/health")
def health():
    return {
        "status": "running"
    }