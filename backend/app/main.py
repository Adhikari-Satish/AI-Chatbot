from fastapi import FastAPI
from app.core.config import settings
from app.db.database import engine, Base
from app.models import user
from app.models.user import User
from app.models.chat import Chat
from app.models.message import Message
# from app.api.v1.routes import chat_history
from app.api.v1.routes import auth
from app.api.v1.routes import chat
from app.api.v1.routes import stats
# from app.api.v1.routes import history
from app.api.v1.routes import message
from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(
    bind=engine
)

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.VERSION
    )


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
    "http://localhost:5173",
    "http://127.0.0.1:5173"
],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(
    stats.router,
    prefix="/api/v1",
    tags=["Stats"]
)

# app.include_router(
#     chat_history.router,
#     prefix="/api/v1"
# )


app.include_router(
    auth.router,
    prefix="/api/v1"
)


app.include_router(
    chat.router,
    prefix="/api/v1"
)

# app.include_router(
#     history.router,
#     prefix="/api/v1"
# )

app.include_router(
    message.router,
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
    

# .\venv\Scripts\Activate.ps1 (it creates a virtual environment)
# ollama serve
# uvicorn app.main:app --reload
# uvicorn app.main:app --reload --reload-exclude venv
# uvicorn app.main:app --reload --reload-dir app
# uvicorn app.main:app