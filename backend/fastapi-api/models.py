from sqlalchemy import Column, Integer, String, DateTime, Text
from database import Base
from datetime import datetime

class NewsArticle(Base):
    __tablename__ = "news_articles"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False, index=True)
    description = Column(Text)
    url = Column(String, nullable=False)
    urlToImage = Column(String, nullable=True)
    publishedAt = Column(String, nullable=False)
    source = Column(String, nullable=False)
    author = Column(String, nullable=True)
    score = Column(Integer, default=0)
    comments = Column(Integer, default=0)
    category = Column(String, default="technology", index=True)
