from fastapi import FastAPI
from app.core.config import settings
from app.db.database import engine, Base
from app.models import user


Base.metadata.create_all(
    bind=engine
)

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.VERSION
    )
from app.api.v1.routes import auth
app.include_router(
    auth.router,
    prefix="/api/v1"
)

from app.api.v1.routes import chat
app.include_router(
    chat.router,
    prefix="/api/v1"
)

@app.get("/")
def home():
    return {
        "message": "Welcome to AI-Chatbot",
        # "version": settings.VERSION
    }


@app.get("/health")
def health():
    return {
        "status": "running"
    }
    


# ollama serve
# uvicorn app.main:app --reload
# uvicorn app.main:app --reload --reload-exclude venv
# uvicorn app.main:app