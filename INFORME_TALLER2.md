# Informe Técnico - Taller 2: InfoMóvil
## Desarrollo de Aplicación Móvil con APIs REST y Apache Cordova

**Estudiante:** Ignacio  
**Fecha:** 16 de Noviembre, 2025  
**Repositorio:** [nacredev/TallerWeb1](https://github.com/nacredev/TallerWeb1)  
**Branch:** taller2

---

## 1. Resumen Ejecutivo

Se desarrolló exitosamente una aplicación móvil multiplataforma llamada **InfoMóvil** que consume datos de tres APIs REST independientes, cada una implementada con diferentes tecnologías del ecosistema JavaScript/TypeScript y Python. La aplicación fue empaquetada como APK de Android utilizando Apache Cordova.

**Objetivos cumplidos:**
- ✅ Implementar 3 APIs REST con diferentes frameworks y bases de datos
- ✅ Desarrollar frontend SPA que consume las APIs locales
- ✅ Configurar y poblar 3 bases de datos (PostgreSQL, MongoDB, SQLite)
- ✅ Generar APK funcional para Android
- ✅ Documentar APIs con Swagger/OpenAPI

---

## 2. Arquitectura del Sistema

### 2.1 Stack Tecnológico

#### Backend APIs
| API | Framework | Lenguaje | Base de Datos | Puerto | ORM/ODM |
|-----|-----------|----------|---------------|--------|---------|
| NestJS API | NestJS 10.x | TypeScript 5.x | PostgreSQL 16 | 3001 | TypeORM |
| Express API | Express 4.x | JavaScript (ES6) | MongoDB 8.2 | 3002 | Mongoose |
| FastAPI | FastAPI 0.121.x | Python 3.14 | SQLite 3 | 8000 | SQLAlchemy |

#### Frontend
- **Tipo:** Single Page Application (SPA)
- **Tecnologías:** HTML5, CSS3, JavaScript (Vanilla ES6 Modules)
- **Estilos:** Tailwind CSS
- **Servidor de desarrollo:** Python HTTP Server (puerto 5500)

#### Mobile
- **Framework:** Apache Cordova
- **Plataforma objetivo:** Android
- **SDK:** Android SDK 35 (VanillaIceCream)
- **Build Tools:** Gradle 8.13, Android Build Tools 35.0.0
- **JDK:** Java 17

### 2.2 Diagrama de Arquitectura

```
┌─────────────────────────────────────────────────────────────┐
│                    CAPA DE PRESENTACIÓN                      │
├─────────────────────────────────────────────────────────────┤
│  Android APK (Cordova)                                       │
│  └─► WebView                                                 │
│      └─► Frontend SPA (HTML/CSS/JS)                          │
└────────────┬────────────────────────────────────────────────┘
             │ HTTP/REST
             ▼
┌─────────────────────────────────────────────────────────────┐
│                    CAPA DE APLICACIÓN                        │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │
│  │  NestJS API │  │ Express API │  │  FastAPI    │          │
│  │  (Port 3001)│  │ (Port 3002) │  │ (Port 8000) │          │
│  │             │  │             │  │             │          │
│  │ • Meals     │  │ • Pokemon   │  │ • News      │          │
│  │ • Movies    │  │             │  │             │          │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘          │
└─────────┼────────────────┼────────────────┼─────────────────┘
          │                │                │
          ▼                ▼                ▼
┌─────────────────────────────────────────────────────────────┐
│                    CAPA DE DATOS                             │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │
│  │ PostgreSQL  │  │  MongoDB    │  │   SQLite    │          │
│  │   (5432)    │  │  (27017)    │  │   (file)    │          │
│  │             │  │             │  │             │          │
│  │ infomovil_db│  │ pokemon_db  │  │  news.db    │          │
│  └─────────────┘  └─────────────┘  └─────────────┘          │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. Implementación de APIs

### 3.1 NestJS API - PostgreSQL

**Responsabilidades:** Gestión de recetas (meals) y películas (movies)

**Características técnicas:**
- TypeORM para mapeo objeto-relacional
- Swagger UI integrado en `/api`
- DTOs para validación de datos
- Servicios inyectables con patrón Repository
- CORS habilitado para desarrollo

**Endpoints principales:**

```typescript
// Meals
GET    /meals              // Listar todas las recetas
GET    /meals/filter?c=:category  // Filtrar por categoría
GET    /meals/lookup?i=:id        // Detalle por ID

// Movies  
GET    /movies             // Listar todas las películas
GET    /movies/search?s=:query    // Buscar por término
GET    /movies/title?t=:title     // Buscar por título exacto
```

**Esquema de base de datos:**

```sql
-- Tabla meals
CREATE TABLE meals (
    "idMeal" INTEGER PRIMARY KEY,
    "strMeal" VARCHAR NOT NULL,
    "strCategory" VARCHAR,
    "strArea" VARCHAR,
    "strInstructions" TEXT,
    "strMealThumb" VARCHAR,
    "strYoutube" VARCHAR,
    "ingredients" TEXT[]
);

-- Tabla movies
CREATE TABLE movies (
    "imdbID" VARCHAR PRIMARY KEY,
    "Title" VARCHAR NOT NULL,
    "Year" VARCHAR,
    "Rated" VARCHAR,
    "Released" VARCHAR,
    "Runtime" VARCHAR,
    "Genre" VARCHAR,
    "Director" VARCHAR,
    "Plot" TEXT,
    "Poster" VARCHAR,
    "Type" VARCHAR
);
```

### 3.2 Express API - MongoDB

**Responsabilidades:** Gestión de pokémon

**Características técnicas:**
- Mongoose para modelado de datos
- Swagger con swagger-jsdoc y swagger-ui-express
- Middleware CORS y validación
- Paginación en endpoints de listado

**Endpoints principales:**

```javascript
GET    /pokemon?limit=:n&offset=:m  // Lista con paginación
GET    /pokemon/:id                  // Detalle por ID
GET    /pokemon/name/:name           // Buscar por nombre
```

**Modelo de datos (Mongoose Schema):**

```javascript
{
  id: Number (required, unique),
  name: String (required),
  height: Number,
  weight: Number,
  types: [String],
  abilities: [String],
  sprites: {
    front_default: String,
    other: {
      'official-artwork': {
        front_default: String
      }
    }
  }
}
```

### 3.3 FastAPI - SQLite

**Responsabilidades:** Gestión de noticias tecnológicas

**Características técnicas:**
- SQLAlchemy ORM con modelos declarativos
- Pydantic para validación y serialización
- OpenAPI/Swagger docs automático en `/docs`
- Endpoints con query parameters opcionales

**Endpoints principales:**

```python
GET    /news?limit=:n&offset=:m&category=:cat  # Lista con filtros
GET    /news/{id}                               # Detalle por ID
GET    /news/top/stories?limit=:n               # Top noticias
POST   /news                                     # Crear noticia (testing)
```

**Modelo de datos (SQLAlchemy):**

```python
class NewsArticle(Base):
    id: int (primary_key)
    title: str
    description: str
    url: str
    urlToImage: str
    publishedAt: datetime
    source: str
    author: str
    score: int
    comments: int
```

---

## 4. Frontend - Single Page Application

### 4.1 Arquitectura del Frontend

**Patrón de diseño:** Module Pattern con ES6 Modules

**Estructura de archivos:**
```
frontend/
├── index.html              # Punto de entrada
├── js/
│   └── app.js             # Lógica principal SPA
├── api/                   # Capa de servicios
│   ├── pokeapi.js        # Cliente Express API
│   ├── themealdb.js      # Cliente NestJS API (meals)
│   ├── omdbapi.js        # Cliente NestJS API (movies)
│   └── newsapi.js        # Cliente FastAPI
├── css/
│   └── styles.css        # Estilos compilados de Tailwind
└── assets/
    └── backgrounds/       # Imágenes de fondo
```

### 4.2 Consumo de APIs

**Patrón de integración:** Adaptador (Adapter Pattern)

Cada módulo API adapta las respuestas del backend al formato esperado por el frontend:

```javascript
// Ejemplo: pokeapi.js
export async function getPokemons(limit = 12, offset = 0) {
  const res = await fetch(`${POKEMON_API_BASE}/pokemon?limit=${limit}&offset=${offset}`);
  const data = await res.json();
  // La API ya devuelve {count, results} - formato esperado
  return data;
}

// Ejemplo: omdbapi.js  
export async function searchMovies(search) {
  const response = await fetch(`${MOVIES_API_BASE}/movies/search?s=${search}`);
  const data = await response.json();
  // Adaptar al formato OMDB
  const movies = data.Search || [];
  return {
    Response: movies.length > 0 ? 'True' : 'False',
    Search: movies
  };
}
```

### 4.3 Características de UI/UX

- **Navegación SPA:** Sin recargas de página
- **Responsive design:** Adaptable a móviles y tablets
- **Fondos dinámicos:** Cambian según la sección activa
- **Lazy loading:** Imágenes con fallback
- **Error handling:** Mensajes amigables para el usuario

---

## 5. Configuración de Bases de Datos

### 5.1 PostgreSQL 16

**Instalación:**
```powershell
winget install PostgreSQL.PostgreSQL.16
```

**Configuración:**
```bash
# Crear base de datos
createdb -U postgres infomovil_db

# Variables de entorno (.env)
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=pikachu2
DB_DATABASE=infomovil_db
```

**Seed data:** 2 recetas, 2 películas

### 5.2 MongoDB 8.2

**Instalación:**
```powershell
winget install MongoDB.Server
```

**Configuración:**
```bash
# URI de conexión (.env)
MONGO_URI=mongodb://localhost:27017/pokemon_db

# Servicio Windows
Get-Service -Name MongoDB  # Verificar estado
```

**Seed data:** 5 pokémon (Bulbasaur, Charmander, Squirtle, Pikachu, Mewtwo)

### 5.3 SQLite

**Ventajas:** Sin instalación, base de datos en archivo

**Ubicación:** `backend/fastapi-api/news.db`

**Seed data:** 5 noticias de tecnología

---

## 6. Empaquetado con Apache Cordova

### 6.1 Configuración del Entorno

**Herramientas instaladas:**

```powershell
# Cordova CLI
npm install -g cordova

# Java JDK 17
winget install Oracle.JDK.17

# Android Studio + SDK
winget install Google.AndroidStudio

# Gradle 8.5
# Descarga manual y configuración en PATH
```

**Variables de entorno configuradas:**
```
ANDROID_HOME=C:\Users\Ignac\AppData\Local\Android\Sdk
ANDROID_SDK_ROOT=C:\Users\Ignac\AppData\Local\Android\Sdk
JAVA_HOME=C:\Program Files\Java\jdk-17
PATH=...;C:\Gradle\gradle-8.5\bin
```

### 6.2 Proceso de Build

```bash
# 1. Crear proyecto Cordova
cordova create cordova-app com.infomovil.app InfoMovil

# 2. Copiar archivos del frontend
Copy-Item frontend/* cordova-app/www/ -Recurse -Force

# 3. Agregar plataforma Android
cd cordova-app
cordova platform add android

# 4. Compilar APK
cordova build android
```

**Resultado:**
```
BUILD SUCCESSFUL in 59s
APK generado en:
cordova-app/platforms/android/app/build/outputs/apk/debug/app-debug.apk
```

### 6.3 Configuración de Cordova

**config.xml:**
```xml
<widget id="com.infomovil.app" version="1.0.0">
    <name>InfoMovil</name>
    <description>
        Aplicación móvil para consultar Pokémon, Recetas, Películas y Noticias
    </description>
    <author email="dev@infomovil.com">
        InfoMóvil Team
    </author>
</widget>
```

---

## 7. Pruebas y Validación

### 7.1 Pruebas de APIs

**Método:** Peticiones HTTP directas con PowerShell

```powershell
# Test NestJS
Invoke-WebRequest http://localhost:3001/meals | ConvertFrom-Json
# ✅ Response: {"meals":[...]}

# Test Express  
Invoke-WebRequest http://localhost:3002/pokemon?limit=3 | ConvertFrom-Json
# ✅ Response: {"count":5,"results":[...]}

# Test FastAPI
Invoke-WebRequest http://localhost:8000/news/top/stories | ConvertFrom-Json
# ✅ Response: {"articles":[...],"totalResults":5}
```

### 7.2 Pruebas de Frontend

**Secciones validadas:**
- ✅ **Pokémon:** Lista de 5 pokémon con imágenes y detalles
- ✅ **Recetas:** 2 recetas con categoría Seafood
- ✅ **Películas:** Búsqueda funcional (ej: "Dark" → The Dark Knight)
- ✅ **Noticias:** Top 5 noticias ordenadas por score

**Navegación:**
- ✅ Cambio entre secciones sin recargar página
- ✅ Botón "Volver" funcional en todas las vistas
- ✅ Fondos cambian según sección activa

### 7.3 Verificación del APK

**Archivo generado:**
- **Nombre:** InfoMovil.apk
- **Tamaño:** ~5-7 MB
- **Ubicación:** `C:\Users\Ignac\Documents\GitHub\TallerWeb1\InfoMovil.apk`
- **Estado:** ✅ Compilado exitosamente

---

## 8. Desafíos y Soluciones

### 8.1 Problema: TypeORM imdbID tipo incompatible

**Error:**
```
ERROR: column "imdbID" is of type integer but expression is of type character varying
```

**Causa:** `@PrimaryGeneratedColumn()` genera IDs numéricos, pero imdbID es string.

**Solución:**
```typescript
// Antes
@PrimaryGeneratedColumn()
imdbID: string;

// Después
@PrimaryColumn()
imdbID: string;
```

### 8.2 Problema: Frontend - "data.map is not a function"

**Causa:** Inconsistencia en formato de respuesta de APIs.

**Solución:** Adaptar respuestas en módulos API:
```javascript
// pokeapi.js
return data; // Ya viene como {count, results}

// omdbapi.js
const movies = data.Search || []; // Manejar arrays vacíos
return { Response: movies.length > 0 ? 'True' : 'False', Search: movies };
```

### 8.3 Problema: Cordova - "Could not find Gradle"

**Causa:** Gradle no instalado ni en PATH.

**Solución:**
```powershell
# Descargar Gradle manualmente
Invoke-WebRequest https://services.gradle.org/distributions/gradle-8.5-bin.zip
Expand-Archive gradle.zip C:\Gradle

# Agregar al PATH
$env:Path += ";C:\Gradle\gradle-8.5\bin"
```

### 8.4 Problema: Cordova - "No installed build tools version 35.0.0"

**Solución:**
```bash
# Instalar desde SDK Manager CLI
sdkmanager "build-tools;35.0.0"
```

---

## 9. Documentación de APIs

### 9.1 Swagger/OpenAPI

Todas las APIs incluyen documentación interactiva:

- **NestJS:** http://localhost:3001/api
- **Express:** http://localhost:3002/api-docs
- **FastAPI:** http://localhost:8000/docs

**Características:**
- Especificación OpenAPI 3.0
- Interfaz web interactiva
- Pruebas de endpoints en vivo
- Esquemas de request/response
- Códigos de estado HTTP documentados

---

## 10. Control de Versiones

### 10.1 Estrategia de Branching

```
main (producción)
  └── taller2 (desarrollo)
```

**Commits destacados:**
1. Setup inicial de NestJS, Express y FastAPI
2. Configuración de bases de datos y seeds
3. Migración de frontend a APIs locales
4. Fix: TypeORM imdbID tipo de dato
5. Fix: Frontend API adapters
6. Build: Configuración Cordova y generación APK
7. Docs: Informe técnico y documentación

### 10.2 Archivos importantes en Git

```
.gitignore incluye:
- node_modules/
- __pycache__/
- *.db (SQLite databases)
- .env (credenciales)
- platforms/ (Cordova builds)
- *.apk (archivos binarios)
```

---

## 11. Conclusiones

### 11.1 Objetivos Alcanzados

✅ **Desarrollo Backend:** Se implementaron exitosamente 3 APIs REST con diferentes tecnologías (NestJS, Express, FastAPI), demostrando versatilidad en el stack técnico.

✅ **Persistencia de Datos:** Se configuraron y poblaron 3 bases de datos diferentes (PostgreSQL, MongoDB, SQLite), cada una apropiada para su caso de uso.

✅ **Frontend Funcional:** Se desarrolló un SPA responsive que consume las 3 APIs locales correctamente.

✅ **Empaquetado Móvil:** Se generó un APK funcional para Android utilizando Apache Cordova.

✅ **Documentación:** Se documentaron todas las APIs con Swagger/OpenAPI y se creó este informe técnico completo.

### 11.2 Aprendizajes Técnicos

1. **Integración de tecnologías heterogéneas:** Capacidad de trabajar con TypeScript, JavaScript y Python en un mismo proyecto.

2. **Gestión de bases de datos:** Experiencia práctica con SQL (PostgreSQL), NoSQL (MongoDB) y bases de datos embebidas (SQLite).

3. **Patrones de diseño:** Implementación de Repository Pattern, Adapter Pattern y Module Pattern.

4. **DevOps básico:** Configuración de entornos de desarrollo, manejo de variables de entorno, gestión de dependencias.

5. **Mobile development:** Comprensión del proceso de compilación de aplicaciones híbridas con Cordova.

### 11.3 Mejoras Futuras

1. **Autenticación:** Implementar JWT para proteger endpoints
2. **Testing:** Agregar tests unitarios y de integración
3. **CI/CD:** Configurar pipeline de deployment automático
4. **Producción:** Configurar reverse proxy (Nginx) y HTTPS
5. **APK Release:** Firmar APK para distribución en Play Store
6. **Optimización:** Implementar caching con Redis
7. **Monitoreo:** Agregar logging centralizado y métricas

---

## 12. Referencias

### 12.1 Documentación Oficial

- [NestJS Documentation](https://docs.nestjs.com/)
- [Express.js Guide](https://expressjs.com/)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [TypeORM Documentation](https://typeorm.io/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [SQLAlchemy Documentation](https://docs.sqlalchemy.org/)
- [Apache Cordova Documentation](https://cordova.apache.org/docs/)
- [Android Developer Guide](https://developer.android.com/)

### 12.2 Herramientas Utilizadas

- **VS Code:** Editor de código
- **Postman:** Testing de APIs (alternativo a Swagger)
- **Android Studio:** SDK Manager y emulador
- **Git:** Control de versiones
- **PowerShell:** Automatización y scripting
- **Windows Terminal:** Gestión de terminales

---

## Anexos

### Anexo A: Comandos de Ejecución

**Iniciar todos los servidores:**

```powershell
# Terminal 1 - NestJS
cd backend\nestjs-api
npm start

# Terminal 2 - Express
cd backend\express-api
npm start

# Terminal 3 - FastAPI
cd backend\fastapi-api
python main.py

# Terminal 4 - Frontend
cd frontend
python -m http.server 5500
```

### Anexo B: Estructura Completa del Proyecto

```
TallerWeb1/
├── backend/
│   ├── nestjs-api/
│   │   ├── src/
│   │   │   ├── meals/
│   │   │   ├── movies/
│   │   │   ├── app.module.ts
│   │   │   ├── main.ts
│   │   │   └── seed.ts
│   │   ├── .env
│   │   └── package.json
│   ├── express-api/
│   │   ├── config/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── .env
│   │   ├── seed.js
│   │   └── server.js
│   └── fastapi-api/
│       ├── .env
│       ├── database.py
│       ├── main.py
│       ├── models.py
│       ├── schemas.py
│       └── seed.py
├── frontend/
│   ├── api/
│   ├── css/
│   ├── js/
│   ├── assets/
│   └── index.html
├── cordova-app/
│   ├── platforms/
│   ├── www/
│   └── config.xml
├── InfoMovil.apk
├── PROGRESO_TALLER2.md
├── INFORME_TALLER2.md
└── README.md
```

---

**Fin del Informe**

*Documento generado el 16 de Noviembre de 2025*  
*InfoMóvil - Taller 2 de Desarrollo Web y Móvil*
