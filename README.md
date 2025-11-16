# InfoMóvil - Aplicación Web Móvil (Taller 2)

## Información del Grupo
- **Número de grupo**: [Tu número de grupo]
- **Integrantes**:
  1. Brayan Pizarro Bugueño - RUT: 19.873.488-8
  2. Ignacio Cruz Reyes - RUT: 21.127.029-2
  3. Cecilia Gonzalez Alcayaga - RUT: 19.712.743-0
  4. [Cuarto integrante] - RUT: [RUT]

## Descripción del Proyecto

InfoMóvil es una aplicación web móvil completa que centraliza información dinámica de diferentes fuentes. En el **Taller 2**, evolucionamos el proyecto hacia una arquitectura completa con:

- **3 APIs Backend propias** (NestJS, Express, FastAPI)
- **Frontend Mobile First** con Tailwind CSS
- **APK Android** empaquetado con Apache Cordova

La aplicación provee información sobre recetas, películas, pokémon y noticias tecnológicas, todo desde nuestras propias APIs con bases de datos.

## Tecnologías Utilizadas

### Backend (3 APIs Independientes)

1. **NestJS API** (Puerto 3001)
   - Framework: NestJS + TypeScript
   - Base de Datos: SQLite (simple para despliegue rápido) *opcional migrar a PostgreSQL*
   - Endpoints: Recetas (`/api/filter.php`, `/api/lookup.php`)
   - ORM: TypeORM
   - Documentación: Swagger (`/api-docs`)

2. **Express API** (Puerto 3002)
   - Framework: Express.js (Node.js)
   - Base de Datos: SQLite (estilo PokeAPI simplificada) *otra variante con MongoDB en carpeta express-api*
   - Endpoints: Pokémon (`/api/pokemon`, `/api/pokemon/:id`)
   - Documentación: README + (Swagger para variante Mongo)

3. **FastAPI Noticias** (Puerto 8000) y **FastAPI Películas** (Puerto 3003)
   - Framework: FastAPI (Python)
   - Base de Datos: SQLite
   - Endpoints Noticias: `/news`, `/news/{id}`, `/news/top/stories`
   - Endpoints Películas: `/api?s=`, `/api?t=` (compatibles OMDb)
   - ORM: SQLAlchemy
   - Documentación: OpenAPI automática (`/docs`, `/redoc`)

### Frontend
- **JavaScript** puro (Vanilla JS)
- **Tailwind CSS** para diseño Mobile First
- **Apache Cordova** para empaquetado APK
- **Consumo de APIs** con Fetch API

## Características Técnicas
- Diseño Mobile First usando Tailwind CSS
- Implementado con JavaScript puro (sin frameworks)
- Single Page Application (SPA)
- Manejo de errores y estados de carga
- Interfaz responsiva y accesible
- Filtrado y búsqueda dinámica
- Navegación fluida sin recarga de página

## Estructura del Proyecto
```
TallerWeb1/
├── backend/
│   ├── nestjs-api/         # API NestJS (Recetas y Películas)
│   │   ├── src/
│   │   │   ├── meals/
│   │   │   ├── movies/
│   │   │   ├── app.module.ts
│   │   │   └── main.ts
│   │   ├── package.json
│   │   └── README.md
│   ├── express-api/        # API Express (Pokémon)
│   │   ├── models/
│   │   ├── routes/
│   │   ├── server.js
│   │   ├── package.json
│   │   └── README.md
│   ├── fastapi-api/        # API FastAPI (Noticias)
│   │   ├── main.py
│   │   ├── models.py
│   │   ├── database.py
│   │   ├── seed.py
│   │   ├── requirements.txt
│   │   └── README.md
│   └── README.md           # Documentación general del backend
├── frontend/
│   ├── api/                # Módulos de integración con APIs propias
│   ├── assets/             # Recursos estáticos
│   ├── css/                # Estilos Tailwind
│   ├── js/                 # Lógica JavaScript
│   └── index.html          # Página principal
├── cordova/                # Configuración Cordova (APK)
└── README.md               # Este archivo
```

## Instalación y Ejecución

### Prerequisitos
- Node.js 18+
- Python 3.9+
- PostgreSQL
- MongoDB
- Apache Cordova

### Backend (APIs)

```powershell
# 1. NestJS Recetas (3001)
cd backend/nestjs-api
npm install
npm run seed   # carga datos ejemplo
npm run start:dev

# 2. Express Pokémon (3002)
cd backend/api-pokemon-express
npm install
node server.js

# 3. FastAPI Noticias (8000)
cd backend/fastapi-api
python -m venv .venv; .\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python main.py

# 4. FastAPI Películas (3003)
cd backend/api-peliculas-fastapi
python -m venv .venv; .\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python main.py
```

### Frontend

```powershell
cd frontend
# (Si hubiera dependencias de build Tailwind)
npm install
# Generar CSS (si existe script)
# npm run build:css
npx http-server -p 5173
# Abrir http://localhost:5173
```

### APK Android (Cordova)

```powershell
# Instalar Cordova global
npm install -g cordova

# Si ya existe carpeta cordova/ saltar create
cd cordova
cordova platform add android
cordova plugin add cordova-plugin-whitelist cordova-plugin-statusbar cordova-plugin-splashscreen

# Copiar contenido compilado del frontend a cordova/www
# (Por ejemplo, desde frontend/) 
# Confirmar index.html y assets dentro de www/

cordova build android
# APK resultante: platforms/android/app/build/outputs/apk/debug/app-debug.apk
```

## Estados de Carga y Errores
- Loader spinner CSS clase `.loader`.
- Mensajes de error unificados `.error-msg`.
- Uso en vistas: Pokémon, Películas, Recetas, Noticias.

## Puertos Resumen
| Servicio              | Puerto |
|-----------------------|--------|
| NestJS Recetas        | 3001   |
| Express Pokémon       | 3002   |
| FastAPI Películas     | 3003   |
| FastAPI Noticias      | 8000   |
| Frontend (http-server)| 5173   |

## Pendientes Manuales
- Completar Número de Grupo y cuarto integrante.
- Ajustar imágenes backgrounds si faltan.
- Verificar Android SDK instalado (JAVA_HOME, ANDROID_HOME). 