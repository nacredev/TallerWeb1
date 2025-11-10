# NestJS API - InfoMóvil

API REST desarrollada con NestJS y TypeScript que provee información de recetas y películas.

## Tecnologías

- **Framework**: NestJS + TypeScript
- **Base de Datos**: PostgreSQL
- **ORM**: TypeORM
- **Documentación**: Swagger/OpenAPI

## Instalación

```bash
# Instalar dependencias
npm install

# Copiar variables de entorno
cp .env.example .env

# Configurar base de datos en .env
```

## Configuración de Base de Datos

1. Crear base de datos PostgreSQL:
```bash
createdb infomovil_db
```

2. La base de datos se inicializará automáticamente al ejecutar la aplicación.

## Ejecución

```bash
# Desarrollo
npm run start:dev

# Producción
npm run build
npm run start:prod
```

## Endpoints

La API estará disponible en `http://localhost:3001`

### Recetas (Meals)
- `GET /meals/filter?c=Seafood` - Obtener recetas por categoría
- `GET /meals/lookup?i=1` - Obtener detalle de una receta
- `GET /meals` - Obtener todas las recetas

### Películas (Movies)
- `GET /movies/search?s=Batman` - Buscar películas
- `GET /movies/title?t=Batman` - Obtener película por título
- `GET /movies` - Obtener todas las películas

## Documentación

La documentación Swagger está disponible en: `http://localhost:3001/api`

## Estructura del Proyecto

```
src/
├── meals/
│   ├── meal.entity.ts
│   ├── meals.controller.ts
│   ├── meals.service.ts
│   └── meals.module.ts
├── movies/
│   ├── movie.entity.ts
│   ├── movies.controller.ts
│   ├── movies.service.ts
│   └── movies.module.ts
├── app.module.ts
└── main.ts
```
