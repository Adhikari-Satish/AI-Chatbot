from pydantic_settings import BaseSettings


class Settings(BaseSettings):

    APP_NAME: str = "AI-Chatbot"

    VERSION: str = "1.0.0"

    DATABASE_URL: str

    JWT_SECRET: str
    
    ALGORITHM: str = "HS256"
    
    SECRET_KEY:str

    OLLAMA_URL: str
    
    MAIL_USERNAME:str

    MAIL_PASSWORD:str

    MAIL_FROM:str

    class Config:
        env_file = ".env"
        extra="allow"



settings = Settings()