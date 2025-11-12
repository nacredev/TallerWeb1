from database import SessionLocal
from models import Movie

def seed_database():
    db = SessionLocal()
    
    movies_data = [
        {
            "title": "The Avengers",
            "year": "2012",
            "genre": "Action, Adventure, Sci-Fi",
            "director": "Joss Whedon",
            "plot": "Earth's mightiest heroes must come together and learn to fight as a team...",
            "poster": "https://example.com/avengers.jpg",
            "imdb_id": "tt0848228",
            "type": "movie"
        },
        {
            "title": "Inception",
            "year": "2010", 
            "genre": "Action, Adventure, Sci-Fi",
            "director": "Christopher Nolan",
            "plot": "A thief who steals corporate secrets through dream-sharing technology...",
            "poster": "https://example.com/inception.jpg",
            "imdb_id": "tt1375666",
            "type": "movie"
        }
    ]
    
    for movie_data in movies_data:
        movie = Movie(**movie_data)
        db.add(movie)
    
    db.commit()
    db.close()
    print("Base de datos poblada con películas de ejemplo")

if __name__ == "__main__":
    seed_database()