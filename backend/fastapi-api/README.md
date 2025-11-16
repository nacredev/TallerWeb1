# FastAPI - InfoMóvil

API REST desarrollada con FastAPI y Python que provee información de noticias tecnológicas.

## Tecnologías

- **Framework**: FastAPI (Python)
- **Base de Datos**: SQLite (puede cambiar a PostgreSQL fácilmente)
- **ORM**: SQLAlchemy
- **Documentación**: Swagger/OpenAPI (automática con FastAPI)

## Instalación

```bash
# Crear entorno virtual (recomendado)
python -m venv venv

# Activar entorno virtual
# En Windows:
venv\Scripts\activate
# En Linux/Mac:
source venv/bin/activate

# Instalar dependencias
pip install -r requirements.txt

# Copiar variables de entorno
cp .env.example .env
```

## Configuración de Base de Datos

La base de datos SQLite se crea automáticamente. Para poblar con datos de ejemplo:

```bash
python seed.py
```

## Ejecución

```bash
# Desarrollo con auto-reload
uvicorn main:app --reload --port 8000

# O usando Python directamente
python main.py
```

## Endpoints

La API estará disponible en `http://localhost:8000`

### Noticias (News)
- `GET /news?limit=10&offset=0` - Obtener lista de noticias (paginado)
- `GET /news?category=technology` - Filtrar noticias por categoría
- `GET /news/{id}` - Obtener detalle de una noticia por ID
- `GET /news/top/stories?limit=10` - Obtener las noticias más populares
- `POST /news` - Crear una nueva noticia (para testing)

### Root
- `GET /` - Información básica de estado y links a documentación.

### Ejemplos rápidos (curl)
```bash
# Lista paginada (5 primeras)
curl "http://localhost:8000/news?limit=5"

# Filtrar por categoría science
curl "http://localhost:8000/news?category=science&limit=3"

# Top stories (orden score DESC)
curl "http://localhost:8000/news/top/stories?limit=3"

# Detalle por ID
curl "http://localhost:8000/news/1"

# Crear noticia (testing)
curl -X POST http://localhost:8000/news \
  -H "Content-Type: application/json" \
  -d '{
    "title":"Nueva API",
    "description":"Descripción corta",
    "url":"https://example.com/nueva",
    "urlToImage":null,
    "publishedAt":"2025-11-15T10:00:00Z",
    "source":"Manual",
    "author":"Equipo",
    "score":42,
    "comments":0
  }'
```

### Parámetros de consulta
- **limit**: Número de noticias a retornar (default: 10, max: 100)
- **offset**: Offset para paginación (default: 0)
- **category**: Filtrar por categoría (technology, science, business)

## Documentación

FastAPI genera documentación automática:

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## Estructura del Proyecto

```
fastapi-api/
├── main.py              # Aplicación principal
├── models.py            # Modelos SQLAlchemy
├── database.py          # Configuración de base de datos
├── seed.py              # Script para poblar BD
├── requirements.txt     # Dependencias Python
└── README.md
```

## Respuesta de ejemplo

```json
{
  "articles": [
    {
      "id": 1,
      "title": "New JavaScript Framework Released",
      "description": "A revolutionary new framework...",
      "url": "https://example.com/news/1",
      "urlToImage": "https://...",
      "publishedAt": "2024-11-10T10:30:00",
      "source": "TechCrunch",
      "author": "John Doe",
      "score": 250,
      "comments": 45
    }
  ],
  "totalResults": 1
}
```

## Formato de errores
FastAPI devuelve por defecto:
```json
{ "detail": "Error message" }
```
Se puede ampliar a un formato uniforme (`{"error":"mensaje","code":404}`) adaptando los `HTTPException` en el código.

## Integración Frontend
El frontend consume:
- Lista: `/news?limit=...`
- Top stories: `/news/top/stories?limit=...`
Y normaliza las claves para mostrar título, descripción e imagen.

## Migrar a PostgreSQL

Para usar PostgreSQL en lugar de SQLite, cambia en `.env`:

```bash
DATABASE_URL=postgresql://user:password@localhost/news_db
```

Y actualiza `requirements.txt`:
```bash
pip install psycopg2-binary
```
