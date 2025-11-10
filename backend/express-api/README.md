# Express API - InfoMóvil

API REST desarrollada con Express.js y MongoDB que provee información de Pokémon.

## Tecnologías

- **Framework**: Express.js (Node.js)
- **Base de Datos**: MongoDB
- **ODM**: Mongoose
- **Documentación**: Swagger/OpenAPI

## Instalación

```bash
# Instalar dependencias
npm install

# Copiar variables de entorno
cp .env.example .env
```

## Configuración de Base de Datos

1. Asegurarse de tener MongoDB instalado y corriendo:
```bash
# En Windows
mongod

# En Linux/Mac
sudo systemctl start mongod
```

2. La base de datos `pokemon_db` se creará automáticamente.

## Ejecución

```bash
# Desarrollo con auto-reload
npm run dev

# Producción
npm start
```

## Endpoints

La API estará disponible en `http://localhost:3002`

### Pokémon
- `GET /pokemon?limit=12&offset=0` - Obtener lista de pokémon (paginado)
- `GET /pokemon/:id` - Obtener detalle de un pokémon por ID
- `GET /pokemon/name/:name` - Obtener detalle de un pokémon por nombre

## Documentación

La documentación Swagger está disponible en: `http://localhost:3002/api-docs`

## Estructura del Proyecto

```
express-api/
├── models/
│   └── pokemon.model.js
├── routes/
│   └── pokemon.routes.js
├── server.js
├── package.json
└── README.md
```

## Poblar Base de Datos

Puedes usar el siguiente script para poblar la base de datos con datos iniciales de pokémon (ejecutar después de iniciar el servidor):

```javascript
// seed.js - Crear y ejecutar este archivo
import mongoose from 'mongoose';
import Pokemon from './models/pokemon.model.js';

const samplePokemon = [
  {
    id: 1,
    name: 'bulbasaur',
    height: 7,
    weight: 69,
    types: ['grass', 'poison'],
    sprites: {
      front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    },
  },
  // Agregar más pokémon...
];

mongoose.connect('mongodb://localhost:27017/pokemon_db')
  .then(async () => {
    await Pokemon.insertMany(samplePokemon);
    console.log('✅ Database seeded');
    process.exit(0);
  });
```
