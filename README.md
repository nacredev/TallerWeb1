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
   - Base de Datos: PostgreSQL
   - Endpoints: Recetas y Películas
   - ORM: TypeORM
   - Documentación: Swagger

2. **Express API** (Puerto 3002)
   - Framework: Express.js (Node.js)
   - Base de Datos: MongoDB
   - Endpoints: Pokémon
   - ODM: Mongoose
   - Documentación: Swagger

3. **FastAPI** (Puerto 8000)
   - Framework: FastAPI (Python)
   - Base de Datos: SQLite
   - Endpoints: Noticias
   - ORM: SQLAlchemy
   - Documentación: OpenAPI automática

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

Ver instrucciones detalladas en `backend/README.md`

```bash
# 1. NestJS API (Puerto 3001)
cd backend/nestjs-api
npm install
cp .env.example .env
npm run start:dev

# 2. Express API (Puerto 3002)
cd backend/express-api
npm install
cp .env.example .env
npm run dev

# 3. FastAPI (Puerto 8000)
cd backend/fastapi-api
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python seed.py
python main.py
```

### Frontend

```bash
cd frontend
npm install
npm run build:css
# Abrir index.html con Live Server
```

### APK Android (Cordova)

```bash
# Instalar Cordova
npm install -g cordova

# Crear proyecto Cordova
cordova create cordova com.infomovil.app InfoMovil
cd cordova
cordova platform add android

# Copiar archivos del frontend a www/
# Compilar APK
cordova build android
```