from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class MovieBase(BaseModel):
    title: str
    year: str
    genre: Optional[str] = None
    director: Optional[str] = None
    plot: Optional[str] = None
    poster: Optional[str] = None
    imdb_id: Optional[str] = None
    type: Optional[str] = None

class MovieResponse(MovieBase):
    id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

class SearchResponse(BaseModel):
    Response: str = "True"
    Search: list
    totalResults: str

class MovieSearch(BaseModel):
    Title: str
    Year: str
    imdbID: str
    Type: str
    Poster: str