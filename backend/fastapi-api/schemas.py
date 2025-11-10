from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime


class NewsArticleBase(BaseModel):
    title: str = Field(..., description="Título de la noticia")
    description: str = Field(..., description="Descripción de la noticia")
    url: str = Field(..., description="URL de la noticia")
    urlToImage: Optional[str] = Field(None, description="URL de la imagen")
    publishedAt: str = Field(..., description="Fecha de publicación")
    source: str = Field(..., description="Fuente de la noticia")
    author: Optional[str] = Field(None, description="Autor de la noticia")
    score: int = Field(0, ge=0, description="Puntuación de la noticia")
    comments: int = Field(0, ge=0, description="Número de comentarios")


class NewsArticleCreate(NewsArticleBase):
    """Schema para crear una nueva noticia"""
    pass


class NewsArticleResponse(NewsArticleBase):
    """Schema de respuesta para una noticia"""
    id: int

    class Config:
        from_attributes = True


class NewsListResponse(BaseModel):
    """Schema de respuesta para lista de noticias"""
    articles: list[NewsArticleResponse]
    totalResults: int
