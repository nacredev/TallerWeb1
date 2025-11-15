# API Pokémon (Express + SQLite)

Servicio Express que expone endpoints estilo PokeAPI usando una base de datos SQLite inicializada desde `database/init.sql`.

## Ejecución

```powershell
cd backend/api-pokemon-express
npm install
node server.js
```

- Puerto: `3002`
- Health: `GET /health`

## Endpoints

- `GET /api/pokemon?limit=12&offset=0`
  - Respuesta:
  ```json
  {
    "count": 12,
    "results": [
      { "name": "bulbasaur", "url": "http://localhost:3002/api/pokemon/1" }
    ]
  }
  ```

- `GET /api/pokemon/:id`
  - Respuesta (formato similar a PokeAPI):
  ```json
  {
    "id": 1,
    "name": "bulbasaur",
    "height": 7,
    "weight": 69,
    "sprites": { "front_default": "https://..." },
    "types": [{ "type": { "name": "grass" } }]
  }
  ```

## Notas
- La base de datos se inicializa automáticamente al iniciar el servidor leyendo `database/init.sql`.
- CORS habilitado para localhost.
