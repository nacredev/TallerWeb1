# Backend - InfoMóvil Taller 2

Este directorio contiene las **3 APIs independientes** desarrolladas para el Taller 2 de Introducción a Web Móvil.

## Estructura del Backend

```
backend/
├── DATABASE_SETUP.md    # Guía de configuración de bases de datos
├── README.md            # Este archivo
│
├── nestjs-api/          # API de Recetas y Películas (NestJS + PostgreSQL)
│   ├── src/
│   │   ├── main.ts                    # Entry point y configuración Swagger
│   │   ├── app.module.ts              # Módulo principal con TypeORM
│   │   ├── seed.ts                    # Script de seed de datos
│   │   ├── meals/                     # Módulo de recetas
│   │   │   ├── meal.entity.ts         # Entidad TypeORM
│   │   │   ├── meals.controller.ts    # Controlador REST
│   │   │   ├── meals.service.ts       # Lógica de negocio
│   │   │   ├── meals.module.ts        # Módulo NestJS
│   │   │   └── dto/
│   │   │       └── search-meal.dto.ts # DTOs de validación
│   │   └── movies/                    # Módulo de películas
│   │       ├── movie.entity.ts        # Entidad TypeORM
│   │       ├── movies.controller.ts   # Controlador REST
│   │       ├── movies.service.ts      # Lógica de negocio
│   │       ├── movies.module.ts       # Módulo NestJS
│   │       └── dto/
│   │           └── search-movie.dto.ts # DTOs de validación
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env             # Variables de entorno (crear desde .env.example)
│   └── .env.example     # Plantilla de configuración
│
├── express-api/         # API de Pokémon (Express + MongoDB)
│   ├── config/
│   │   ├── database.js              # Configuración MongoDB
│   │   └── swagger.js               # Configuración Swagger
│   ├── models/
│   │   └── pokemon.model.js         # Modelo Mongoose
│   ├── routes/
│   │   └── pokemon.routes.js        # Rutas REST + Swagger docs
│   ├── server.js                    # Entry point
│   ├── seed.js                      # Script de seed de datos
│   ├── package.json
│   ├── .env             # Variables de entorno (crear desde .env.example)
│   └── .env.example     # Plantilla de configuración
│
└── fastapi-api/         # API de Noticias (FastAPI + SQLite)
    ├── config.py                    # Configuración centralizada
    ├── database.py                  # Configuración SQLite
    ├── models.py                    # Modelos SQLAlchemy
    ├── schemas.py                   # Schemas Pydantic
    ├── main.py                      # Entry point y rutas
    ├── seed.py                      # Script de seed de datos
    ├── requirements.txt
    ├── .env             # Variables de entorno (opcional)
    └── .env.example     # Plantilla de configuración
```

## Tecnologías Utilizadas

### 1. NestJS API (Puerto 3001)
- **Framework**: NestJS + TypeScript
- **Base de Datos**: PostgreSQL
- **ORM**: TypeORM
- **Endpoints**: Recetas y Películas
- **Documentación**: http://localhost:3001/api

### 2. Express API (Puerto 3002)
- **Framework**: Express.js (Node.js)
- **Base de Datos**: MongoDB
- **ODM**: Mongoose
- **Endpoints**: Pokémon
- **Documentación**: http://localhost:3002/api-docs

### 3. FastAPI (Puerto 8000)
- **Framework**: FastAPI (Python)
- **Base de Datos**: SQLite
- **ORM**: SQLAlchemy
- **Endpoints**: Noticias
- **Documentación**: http://localhost:8000/docs

## Características Principales

### ✨ Código Limpio y Organizado

- **Separación de responsabilidades**: Cada API tiene su configuración, modelos, rutas y lógica de negocio en archivos separados
- **DTOs y validaciones**: NestJS usa DTOs con decoradores de validación; FastAPI usa Pydantic schemas
- **Manejo de errores**: Validaciones en todas las rutas, respuestas HTTP apropiadas (404, 400, 500)
- **Configuración centralizada**: Variables de entorno y configuración en archivos dedicados

### 📊 Documentación Automática

- **NestJS**: Swagger en `/api` con decoradores `@ApiTags`, `@ApiOperation`, `@ApiResponse`
- **Express**: Swagger en `/api-docs` con comentarios JSDoc
- **FastAPI**: OpenAPI automática en `/docs` y `/redoc`

### 🔧 Scripts de Seed

Todas las APIs incluyen scripts para poblar la base de datos con datos de ejemplo:

```bash
# NestJS
cd nestjs-api && npm run seed

# Express
cd express-api && npm run seed

# FastAPI
cd fastapi-api && python seed.py
```

### 🛡️ Seguridad y Buenas Prácticas

- CORS habilitado para todas las APIs
- Validación de parámetros de entrada
- Manejo de errores consistente
- Variables de entorno para configuración sensible
- Archivos `.gitignore` para no subir secretos

## Instalación Rápida

### Prerrequisitos

- Node.js 18+ (para NestJS y Express)
- Python 3.9+ (para FastAPI)
- PostgreSQL (para NestJS)
- MongoDB (para Express)

### Instalar todas las APIs

```bash
# 1. NestJS API
cd nestjs-api
npm install
cp .env.example .env
# Configurar PostgreSQL en .env
npm run start:dev

# 2. Express API
cd ../express-api
npm install
cp .env.example .env
# Asegurarse que MongoDB esté corriendo
npm run dev

# 3. FastAPI
cd ../fastapi-api
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt
cp .env.example .env
python seed.py  # Poblar base de datos
python main.py
```

## Endpoints Disponibles

### NestJS API (http://localhost:3001)

#### Recetas
- `GET /meals/filter?c=Seafood` - Obtener recetas por categoría
- `GET /meals/lookup?i=1` - Detalle de receta por ID
- `GET /meals` - Todas las recetas

#### Películas
- `GET /movies/search?s=Batman` - Buscar películas
- `GET /movies/title?t=Batman` - Película por título
- `GET /movies` - Todas las películas

### Express API (http://localhost:3002)

#### Pokémon
- `GET /pokemon?limit=12&offset=0` - Lista de pokémon (paginado)
- `GET /pokemon/:id` - Detalle por ID
- `GET /pokemon/name/:name` - Detalle por nombre

### FastAPI (http://localhost:8000)

#### Noticias
- `GET /news?limit=10&offset=0` - Lista de noticias (paginado)
- `GET /news?category=technology` - Filtrar por categoría
- `GET /news/{id}` - Detalle por ID
- `GET /news/top/stories` - Noticias más populares

## Configuración de Bases de Datos

### PostgreSQL (NestJS)
```bash
# Crear base de datos
createdb infomovil_db

# O usando psql
psql -U postgres
CREATE DATABASE infomovil_db;
```

### MongoDB (Express)
```bash
# Iniciar MongoDB
mongod

# La base de datos pokemon_db se crea automáticamente
```

### SQLite (FastAPI)
```bash
# La base de datos se crea automáticamente al ejecutar
python seed.py
```

## Scripts de Población de Datos

Cada API incluye datos de ejemplo o scripts para poblar las bases de datos:

- **NestJS**: Agregar datos manualmente o crear un script seed
- **Express**: Ver `README.md` para script de seed
- **FastAPI**: Ejecutar `python seed.py`

## Documentación API

Todas las APIs incluyen documentación interactiva:

- **NestJS**: Swagger UI en `/api`
- **Express**: Swagger UI en `/api-docs`
- **FastAPI**: Swagger UI en `/docs` y ReDoc en `/redoc`

## Testing

Para probar las APIs puedes usar:
- Navegador web para endpoints GET
- Postman/Insomnia para todas las peticiones
- La documentación Swagger interactiva de cada API
- cURL desde la terminal

### Ejemplo con cURL

```bash
# NestJS - Recetas
curl http://localhost:3001/meals/filter?c=Seafood

# Express - Pokémon
curl http://localhost:3002/pokemon?limit=5

# FastAPI - Noticias
curl http://localhost:8000/news?limit=5
```

## Justificación de Bases de Datos

- **PostgreSQL (NestJS)**: Ideal para datos relacionales estructurados como recetas y películas. Excelente para queries complejas y transacciones.
- **MongoDB (Express)**: Perfect para datos semi-estructurados de pokémon con schemas flexibles. Buen rendimiento en lectura.
- **SQLite (FastAPI)**: Ligera y fácil de configurar para noticias. No requiere servidor separado. Fácil migración a PostgreSQL si es necesario.

## Troubleshooting

### Puerto en uso
```bash
# Windows
netstat -ano | findstr :3001
taskkill /PID <PID> /F

# Linux/Mac
lsof -i :3001
kill -9 <PID>
```

### Error de conexión a base de datos
- Verificar que PostgreSQL/MongoDB estén corriendo
- Revisar credenciales en archivos `.env`
- Verificar que los puertos estén correctos

### Dependencias
```bash
# NestJS/Express
npm install

# FastAPI
pip install -r requirements.txt
```

## Contacto

Para consultas sobre el backend:
- cristhian.rabi@ce.ucn.cl
- valentina.henriquez@ce.ucn.cl
