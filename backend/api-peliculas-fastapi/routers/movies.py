from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from database import get_db
from models import Movie
import schemas

router = APIRouter(prefix="/api")

@router.get("/")
async def search_movies(
    s: str = Query(..., description="Search term"),
    db: Session = Depends(get_db)
):
    if not s:
        return {"Response": "False", "Error": "Search term required"}
    
    # Buscar películas que coincidan con el título
    movies = db.query(Movie).filter(Movie.title.ilike(f"%{s}%")).limit(10).all()
    
    if not movies:
        return {"Response": "False", "Error": "Movie not found!"}
    
    search_results = [
        {
            "Title": movie.title,
            "Year": movie.year,
            "imdbID": movie.imdb_id,
            "Type": movie.type,
            "Poster": movie.poster if movie.poster else "N/A"
        }
        for movie in movies
    ]
    
    return {
        "Response": "True",
        "Search": search_results,
        "totalResults": str(len(search_results))
    }

@router.get("/")
async def get_movie_by_title(
    t: str = Query(..., description="Movie title"),
    db: Session = Depends(get_db)
):
    if not t:
        return {"Response": "False", "Error": "Title parameter required"}
    
    movie = db.query(Movie).filter(Movie.title.ilike(f"%{t}%")).first()
    
    if not movie:
        return {"Response": "False", "Error": "Movie not found!"}
    
    return {
        "Response": "True",
        "Title": movie.title,
        "Year": movie.year,
        "Rated": "N/A",
        "Released": "N/A",
        "Runtime": "N/A",
        "Genre": movie.genre,
        "Director": movie.director,
        "Writer": "N/A",
        "Actors": "N/A",
        "Plot": movie.plot,
        "Language": "N/A",
        "Country": "N/A",
        "Awards": "N/A",
        "Poster": movie.poster,
        "Ratings": [],
        "Metascore": "N/A",
        "imdbRating": "N/A",
        "imdbVotes": "N/A",
        "imdbID": movie.imdb_id,
        "Type": movie.type,
        "DVD": "N/A",
        "BoxOffice": "N/A",
        "Production": "N/A",
        "Website": "N/A"
    }