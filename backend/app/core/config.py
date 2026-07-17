from pydantic_settings import BaseSettings


class Settings(BaseSettings):

    APP_NAME: str = "AI-Chatbot"

    VERSION: str = "1.0.0"

    DATABASE_URL: str

    JWT_SECRET: str

    OLLAMA_URL: str


    class Config:
        env_file = ".env"



settings = Settings()