import os
from dotenv import load_dotenv

load_dotenv()


class Settings:
    """Configuración de la aplicación"""
    
    # Database
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./news.db")
    
    # API
    API_TITLE: str = "InfoMóvil - News API"
    API_DESCRIPTION: str = "API de Noticias desarrollada con FastAPI y SQLite"
    API_VERSION: str = "1.0.0"
    
    # Server
    HOST: str = os.getenv("HOST", "0.0.0.0")
    PORT: int = int(os.getenv("PORT", 8000))
    
    # CORS
    CORS_ORIGINS: list[str] = ["*"]


settings = Settings()
