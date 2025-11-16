from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from database import get_db
from models import Movie

router = APIRouter(prefix="/api")

@router.get("/")
async def movies_endpoint(
    s: str | None = Query(None, description="Search term (lista de películas)"),
    t: str | None = Query(None, description="Movie title (detalle)"),
    apikey: str | None = Query(None, description="OMDb-style API key (ignorada)"),  # compatibilidad
    db: Session = Depends(get_db)
):
    """Endpoint único compatible con OMDb:
    - /api?s=texto  => búsqueda
    - /api?t=titulo => detalle
    Prioridad: si viene 't' se devuelve detalle, si no se procesa 's'.
    """
    # Detalle por título
    if t:
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
            "Poster": movie.poster if movie.poster else "N/A",
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

    # Búsqueda por término
    if s:
        movies = db.query(Movie).filter(Movie.title.ilike(f"%{s}%")).limit(10).all()
        if not movies:
            return {"Response": "False", "Error": "Movie not found!"}
        search_results = [
            {
                "Title": m.title,
                "Year": m.year,
                "imdbID": m.imdb_id,
                "Type": m.type,
                "Poster": m.poster if m.poster else "N/A"
            }
            for m in movies
        ]
        return {
            "Response": "True",
            "Search": search_results,
            "totalResults": str(len(search_results))
        }

    # Ningún parámetro válido
    return {"Response": "False", "Error": "Must provide 's' (search) or 't' (title)"}