from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime

Base = declarative_base()

class Movie(Base):
    __tablename__ = "movies"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    year = Column(String(10))
    genre = Column(String(100))
    director = Column(String(255))
    plot = Column(Text)
    poster = Column(String(500))
    imdb_id = Column(String(20))
    type = Column(String(20))
    created_at = Column(DateTime, default=datetime.utcnow)