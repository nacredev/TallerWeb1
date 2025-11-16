# InfoMóvil - Aplicación Web Móvil (Taller 2)

## 📋 Información del Grupo


**Integrantes:**
| N° | Nombre Completo | RUT |
|----|----------------|-----|
| 1 | Brayan Pizarro Bugueño | 19.873.488-8 |
| 2 | Ignacio Cruz Reyes | 21.127.029-2 |
| 3 | Cecilia González Alcayaga | 19.712.743-0 |

## Descripción del Proyecto

InfoMóvil es una aplicación web móvil completa que centraliza información dinámica de diferentes fuentes. En el **Taller 2**, evolucionamos el proyecto hacia una arquitectura completa con:

- **3 APIs Backend propias** (NestJS, Express, FastAPI)
- **Frontend Mobile First** con Tailwind CSS
- **APK Android** empaquetado con Apache Cordova

La aplicación provee información sobre recetas, películas, pokémon y noticias tecnológicas, todo desde nuestras propias APIs con bases de datos.

## 🛠️ Tecnologías y Bases de Datos Utilizadas

### Backend - APIs REST

| API | Framework | Lenguaje | Base de Datos | Puerto | ORM/ODM |
|-----|-----------|----------|---------------|--------|---------|
| **Recetas y Películas** | NestJS 10.x | TypeScript 5.x | **PostgreSQL 16** | 3001 | TypeORM |
| **Pokémon** | Express 4.x | JavaScript ES6 | **MongoDB 8.2** | 3002 | Mongoose |
| **Noticias** | FastAPI 0.121.x | Python 3.14 | **SQLite 3** | 8000 | SQLAlchemy |

### Frontend

- **Lenguaje:** JavaScript Vanilla (ES6 Modules)
- **Estilos:** Tailwind CSS 3.x
- **Arquitectura:** Single Page Application (SPA)
- **HTTP Client:** Fetch API nativa

### Mobile

- **Framework:** Apache Cordova
- **Plataforma:** Android
- **Build Tools:** Gradle 8.13
- **SDK:** Android SDK 35 (VanillaIceCream)
- **JDK:** Java 17

### Herramientas de Desarrollo

- **Control de versiones:** Git + GitHub
- **Editor:** Visual Studio Code
- **Testing APIs:** Swagger UI / OpenAPI
- **Package Managers:** npm, pip
- **Terminal:** PowerShell (Windows)

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

## 📦 Instalación y Ejecución

### ⚙️ Prerequisitos

Antes de comenzar, asegúrate de tener instalado:

| Software | Versión Mínima | Comando de verificación |
|----------|----------------|------------------------|
| Node.js | 18+ | `node --version` |
| npm | 9+ | `npm --version` |
| Python | 3.9+ | `python --version` |
| PostgreSQL | 14+ | `psql --version` |
| MongoDB | 6+ | `mongod --version` |
| Java JDK | 17+ | `java -version` |
| Git | 2.x | `git --version` |

### 🗄️ Paso 1: Configurar Bases de Datos

#### PostgreSQL

```powershell
# Instalar PostgreSQL (si no está instalado)
winget install PostgreSQL.PostgreSQL.16

# Crear base de datos
psql -U postgres
CREATE DATABASE infomovil_db;
\q

# Configurar credenciales en backend/nestjs-api/.env
# DB_HOST=localhost
# DB_PORT=5432
# DB_USER=postgres
# DB_PASSWORD=tu_password
# DB_DATABASE=infomovil_db
```

#### MongoDB

```powershell
# Instalar MongoDB (si no está instalado)
winget install MongoDB.Server

# Verificar que el servicio esté corriendo
Get-Service -Name MongoDB

# MongoDB creará automáticamente la base de datos 'pokemon_db'
# Configurar en backend/express-api/.env
# MONGO_URI=mongodb://localhost:27017/pokemon_db
```

#### SQLite

```
No requiere instalación. La base de datos se crea automáticamente.
```

### 🚀 Paso 2: Instalar y Ejecutar Backend

Abre **3 terminales PowerShell** separadas:

#### Terminal 1 - NestJS API (Recetas y Películas)

```powershell
cd backend\nestjs-api

# Instalar dependencias
npm install

# Crear archivo .env con las credenciales de PostgreSQL
# (Ver ejemplo en .env.example)

# Poblar base de datos con datos de prueba
npm run seed

# Iniciar servidor
npm start

# ✅ API corriendo en http://localhost:3001
# 📚 Documentación: http://localhost:3001/api
```

#### Terminal 2 - Express API (Pokémon)

```powershell
cd backend\express-api

# Instalar dependencias
npm install

# Crear archivo .env con MongoDB URI
# MONGO_URI=mongodb://localhost:27017/pokemon_db
# PORT=3002

# Poblar base de datos
node seed.js

# Iniciar servidor
node server.js

# ✅ API corriendo en http://localhost:3002
# 📚 Documentación: http://localhost:3002/api-docs
```

#### Terminal 3 - FastAPI (Noticias)

```powershell
cd backend\fastapi-api

# Crear entorno virtual
python -m venv venv

# Activar entorno virtual
.\venv\Scripts\Activate.ps1

# Instalar dependencias
pip install -r requirements.txt

# Poblar base de datos SQLite
python seed.py

# Iniciar servidor
python main.py

# ✅ API corriendo en http://localhost:8000
# 📚 Documentación: http://localhost:8000/docs
```

### 🌐 Paso 3: Ejecutar Frontend

En una **cuarta terminal**:

```powershell
cd frontend

# Iniciar servidor web
python -m http.server 5500

# ✅ Frontend corriendo en http://localhost:5500
```

**Alternativa con Node.js:**
```powershell
npx serve -p 5500
```

### 📱 Paso 4: Generar APK Android (Opcional)

#### Prerequisitos adicionales para APK:

```powershell
# 1. Instalar Cordova globalmente
npm install -g cordova

# 2. Instalar Java JDK 17
winget install Oracle.JDK.17

# 3. Instalar Android Studio (incluye Android SDK)
winget install Google.AndroidStudio

# 4. Configurar variables de entorno (ejemplo):
# ANDROID_HOME=C:\Users\TuUsuario\AppData\Local\Android\Sdk
# JAVA_HOME=C:\Program Files\Java\jdk-17
```

#### Compilar APK:

```powershell
# Navegar al directorio del proyecto Cordova
cd cordova-app

# Agregar plataforma Android (si no está agregada)
cordova platform add android

# Compilar APK
cordova build android

# ✅ APK generado en:
# cordova-app/platforms/android/app/build/outputs/apk/debug/app-debug.apk
```

### 🧪 Paso 5: Verificar Instalación

Ejecuta estos comandos para verificar que todo esté funcionando:

```powershell
# Probar NestJS API
Invoke-WebRequest http://localhost:3001/meals | ConvertFrom-Json

# Probar Express API
Invoke-WebRequest http://localhost:3002/pokemon?limit=3 | ConvertFrom-Json

# Probar FastAPI
Invoke-WebRequest http://localhost:8000/news/top/stories | ConvertFrom-Json

# Abrir frontend en navegador
Start-Process http://localhost:5500
```

### 📝 Notas Importantes

1. **Orden de inicio:** Primero bases de datos, luego backend, finalmente frontend
2. **Puertos:** Asegúrate que los puertos 3001, 3002, 8000 y 5500 estén libres
3. **Credenciales:** Las contraseñas de bases de datos están en archivos `.env` (no incluidos en Git)
4. **Datos de prueba:** Los scripts de seed populan datos de ejemplo automáticamente
5. **Errores comunes:** Revisa que todas las bases de datos estén corriendo antes de iniciar las APIs

## Estados de Carga y Errores
- Loader spinner CSS clase `.loader`.
- Mensajes de error unificados `.error-msg`.
- Uso en vistas: Pokémon, Películas, Recetas, Noticias.

## 🌐 Puertos y Servicios

| Servicio | Puerto | URL | Documentación |
|----------|--------|-----|---------------|
| **NestJS API** (Recetas/Películas) | 3001 | http://localhost:3001 | http://localhost:3001/api |
| **Express API** (Pokémon) | 3002 | http://localhost:3002 | http://localhost:3002/api-docs |
| **FastAPI** (Noticias) | 8000 | http://localhost:8000 | http://localhost:8000/docs |
| **Frontend** | 5500 | http://localhost:5500 | - |
| **PostgreSQL** | 5432 | localhost:5432 | - |
| **MongoDB** | 27017 | localhost:27017 | - |

## 📚 Endpoints Principales

### NestJS API (Puerto 3001)

**Recetas:**
- `GET /meals` - Listar todas las recetas
- `GET /meals/filter?c={category}` - Filtrar por categoría
- `GET /meals/lookup?i={id}` - Detalle de receta

**Películas:**
- `GET /movies` - Listar todas las películas
- `GET /movies/search?s={query}` - Buscar películas
- `GET /movies/title?t={title}` - Buscar por título exacto

### Express API (Puerto 3002)

**Pokémon:**
- `GET /pokemon?limit={n}&offset={m}` - Lista paginada
- `GET /pokemon/{id}` - Detalle por ID
- `GET /pokemon/name/{name}` - Buscar por nombre

### FastAPI (Puerto 8000)

**Noticias:**
- `GET /news?limit={n}&offset={m}&category={cat}` - Lista con filtros
- `GET /news/{id}` - Detalle de noticia
- `GET /news/top/stories?limit={n}` - Top noticias

## 🐛 Solución de Problemas Comunes

### Error: "Puerto ya en uso"

```powershell
# Verificar qué proceso usa el puerto
netstat -ano | findstr :{puerto}

# Detener proceso si es necesario
Stop-Process -Id {PID} -Force
```

### Error: "No se puede conectar a PostgreSQL"

```powershell
# Verificar que el servicio esté corriendo
Get-Service -Name postgresql*

# Iniciar servicio si está detenido
Start-Service -Name postgresql-x64-16
```

### Error: "No se puede conectar a MongoDB"

```powershell
# Verificar servicio
Get-Service -Name MongoDB

# Iniciar servicio
Start-Service -Name MongoDB
```

### Error: "Module not found" en Node.js

```powershell
# Reinstalar dependencias
rm -r node_modules
rm package-lock.json
npm install
```

### Error: Cordova - "ANDROID_HOME not found"

```powershell
# Configurar variable de entorno
[Environment]::SetEnvironmentVariable("ANDROID_HOME", "C:\Users\TuUsuario\AppData\Local\Android\Sdk", "User")

# Reiniciar terminal
```

## 📄 Archivos de Configuración

### backend/nestjs-api/.env
```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=tu_password
DB_DATABASE=infomovil_db
PORT=3001
```

### backend/express-api/.env
```env
MONGO_URI=mongodb://localhost:27017/pokemon_db
PORT=3002
NODE_ENV=development
```

### backend/fastapi-api/.env (opcional)
```env
DATABASE_URL=sqlite:///./news.db
```

## 📖 Documentación Adicional

- **Informe técnico completo:** Ver [`INFORME_TALLER2.md`](INFORME_TALLER2.md)
- **Progreso del proyecto:** Ver [`PROGRESO_TALLER2.md`](PROGRESO_TALLER2.md)
- **Documentación de Backend:** Ver [`backend/README.md`](backend/README.md)
- **Setup de Bases de Datos:** Ver [`backend/DATABASE_SETUP.md`](backend/DATABASE_SETUP.md)

## 👥 Contribución

Este proyecto fue desarrollado como parte del Taller 2 de Desarrollo Web y Móvil.

**Fecha de entrega:** Noviembre 2025  
**Institución:** [Nombre de la institución]  
**Curso:** Desarrollo Web y Móvil

---

**Última actualización:** 16 de Noviembre, 2025 