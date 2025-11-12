from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import create_tables, engine
from routers import movies
import models

# Crear tablas
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="API Películas FastAPI", version="1.0.0")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Incluir routers
app.include_router(movies.router)

@app.get("/health")
async def health_check():
    return {"status": "OK", "message": "API Películas funcionando"}

@app.get("/")
async def root():
    return {"message": "Bienvenido a la API de Películas"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=3003)