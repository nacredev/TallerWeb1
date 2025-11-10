import asyncio
from sqlalchemy.orm import Session
from database import SessionLocal, engine, Base
from models import NewsArticle
from datetime import datetime, timedelta
import random

# Sample news data
SAMPLE_NEWS = [
    {
        "title": "New JavaScript Framework Released",
        "description": "A revolutionary new framework promises to change web development forever",
        "url": "https://example.com/news/1",
        "urlToImage": "https://via.placeholder.com/400x200?text=Tech+News",
        "source": "TechCrunch",
        "author": "John Doe",
        "score": 250,
        "comments": 45,
        "category": "technology",
    },
    {
        "title": "AI Breakthrough in Healthcare",
        "description": "New AI model can detect diseases with 99% accuracy",
        "url": "https://example.com/news/2",
        "urlToImage": "https://via.placeholder.com/400x200?text=AI+News",
        "source": "MIT Technology Review",
        "author": "Jane Smith",
        "score": 420,
        "comments": 78,
        "category": "technology",
    },
    {
        "title": "Climate Change Report Released",
        "description": "Latest findings show urgent need for action",
        "url": "https://example.com/news/3",
        "urlToImage": "https://via.placeholder.com/400x200?text=Climate",
        "source": "Nature",
        "author": "Dr. Green",
        "score": 350,
        "comments": 120,
        "category": "science",
    },
    {
        "title": "Startup Raises $100M in Series B",
        "description": "Tech startup secures major funding round",
        "url": "https://example.com/news/4",
        "urlToImage": "https://via.placeholder.com/400x200?text=Startup",
        "source": "VentureBeat",
        "author": "Mike Johnson",
        "score": 180,
        "comments": 32,
        "category": "business",
    },
    {
        "title": "New Programming Language Trends",
        "description": "Developers share their favorite languages for 2024",
        "url": "https://example.com/news/5",
        "urlToImage": "https://via.placeholder.com/400x200?text=Programming",
        "source": "Stack Overflow",
        "author": "Dev Community",
        "score": 290,
        "comments": 156,
        "category": "technology",
    },
]

def seed_database():
    """Seed the database with sample news articles"""
    # Create tables
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    try:
        # Check if database is already seeded
        existing_count = db.query(NewsArticle).count()
        if existing_count > 0:
            print(f"✅ Database already contains {existing_count} articles")
            return
        
        # Add sample news
        for i, news_data in enumerate(SAMPLE_NEWS):
            # Generate publish date (recent dates)
            days_ago = random.randint(0, 7)
            publish_date = datetime.now() - timedelta(days=days_ago)
            
            article = NewsArticle(
                **news_data,
                publishedAt=publish_date.isoformat()
            )
            db.add(article)
        
        db.commit()
        print(f"✅ Database seeded with {len(SAMPLE_NEWS)} articles")
    except Exception as e:
        print(f"❌ Error seeding database: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    print("🌱 Seeding database...")
    seed_database()
