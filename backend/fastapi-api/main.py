from fastapi import FastAPI, HTTPException, Query, Depends
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional
import uvicorn
from sqlalchemy.orm import Session

from database import engine, SessionLocal, Base
from models import NewsArticle
from schemas import NewsArticleResponse, NewsListResponse, NewsArticleCreate
from config import settings

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.API_TITLE,
    description=settings.API_DESCRIPTION,
    version=settings.API_VERSION,
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Dependency
def get_db():
    """Dependency para obtener sesión de base de datos"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/", tags=["root"])
async def root():
    """Endpoint raíz de la API"""
    return {
        "message": "InfoMóvil FastAPI - News API",
        "version": settings.API_VERSION,
        "status": "active",
        "docs": "/docs",
        "redoc": "/redoc",
    }


@app.get("/news", response_model=NewsListResponse, tags=["news"])
async def get_news(
    limit: int = Query(10, ge=1, le=100, description="Número de noticias a retornar"),
    offset: int = Query(0, ge=0, description="Offset para paginación"),
    category: Optional[str] = Query(None, description="Categoría de las noticias"),
    db: Session = Depends(get_db),
):
    """
    Obtener lista de noticias con paginación
    
    - **limit**: Número de noticias a retornar (1-100, default: 10)
    - **offset**: Offset para paginación (default: 0)
    - **category**: Filtrar por categoría (opcional)
    """
    query = db.query(NewsArticle)
    
    if category:
        query = query.filter(NewsArticle.category == category)
    
    total = query.count()
    articles = query.order_by(NewsArticle.publishedAt.desc()).offset(offset).limit(limit).all()
    
    return {
        "articles": articles,
        "totalResults": total,
    }


@app.get("/news/{news_id}", response_model=NewsArticleResponse, tags=["news"])
async def get_news_by_id(news_id: int, db: Session = Depends(get_db)):
    """
    Obtener detalle de una noticia por ID
    
    - **news_id**: ID de la noticia
    """
    article = db.query(NewsArticle).filter(NewsArticle.id == news_id).first()
    
    if not article:
        raise HTTPException(status_code=404, detail=f"Article with ID {news_id} not found")
    
    return article


@app.get("/news/top/stories", response_model=NewsListResponse, tags=["news"])
async def get_top_stories(
    limit: int = Query(10, ge=1, le=100, description="Número de noticias a retornar"),
    db: Session = Depends(get_db),
):
    """
    Obtener las noticias más populares ordenadas por score
    
    - **limit**: Número de noticias a retornar (1-100, default: 10)
    """
    articles = (
        db.query(NewsArticle)
        .order_by(NewsArticle.score.desc())
        .limit(limit)
        .all()
    )
    
    return {
        "articles": articles,
        "totalResults": len(articles),
    }


@app.post("/news", response_model=NewsArticleResponse, tags=["news"], status_code=201)
async def create_news(article: NewsArticleCreate, db: Session = Depends(get_db)):
    """
    Crear una nueva noticia
    
    Solo para propósitos de testing y demostración
    """
    db_article = NewsArticle(**article.model_dump())
    db.add(db_article)
    db.commit()
    db.refresh(db_article)
    return db_article


if __name__ == "__main__":
    uvicorn.run(
        app, 
        host=settings.HOST, 
        port=settings.PORT,
        log_level="info"
    )
