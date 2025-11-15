# API Películas FastAPI (OMDb-Compatible)

Expone un endpoint único `/api` que acepta parámetros estilo OMDb:
- `?s=texto` para búsqueda de películas
- `?t=titulo` para detalle de una película
- `?apikey=` ignorado (compatibilidad)

## Ejecución
```powershell
cd backend/api-peliculas-fastapi
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python main.py  # puerto 3003 por defecto
```

## Ejemplos
### Búsqueda
```bash
curl "http://localhost:3003/api?s=matrix"
```
Respuesta:
```json
{
  "Response": "True",
  "Search": [
    {"Title": "The Matrix", "Year": "1999", "imdbID": "tt0133093", "Type": "movie", "Poster": "..."}
  ],
  "totalResults": "1"
}
```

### Detalle
```bash
curl "http://localhost:3003/api?t=matrix"
```
Respuesta (extracto):
```json
{
  "Response": "True",
  "Title": "The Matrix",
  "Year": "1999",
  "Genre": "Action, Sci-Fi",
  "Director": "Lana Wachowski, Lilly Wachowski",
  "Plot": "..."
}
```

## Estructura
- `models.py`: Modelo SQLAlchemy `Movie`
- `routers/movies.py`: Lógica de búsqueda y detalle
- `database.py`: Sesiones y conexión

## Notas
- Devuelve campos simulados (Rated, Runtime, etc.) con "N/A" si no están en la base.
- Si falta parámetro muestra: `{ "Response": "False" }` con `Error` descriptivo.
- Aumentar límite de búsqueda modificando `.limit(10)` en el router.
