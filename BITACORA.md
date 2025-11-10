# 📋 BITÁCORA DE DESARROLLO - InfoMóvil Taller 2

**Fecha de inicio:** 10 de Noviembre, 2025  
**Proyecto:** InfoMóvil - Taller Web Móvil 2  
**Repositorio:** TallerWeb1 (nacredev/TallerWeb1)

---

## 🎯 OBJETIVO DEL PROYECTO

Desarrollar una aplicación web móvil con backend propio y empaquetarla como APK usando Apache Cordova.

**Requisitos del Taller 2:**
1. **Backend/APIs**: Desarrollar 3 APIs independientes (NestJS, Express, FastAPI)
2. **Frontend**: Modificar frontend de Taller 1 para consumir APIs locales
3. **Cordova**: Empaquetar aplicación como APK para Android

---

## ✅ COMPLETADO HASTA AHORA

### 1. Backend - Estructura y Organización (100% Completado)

#### 1.1 NestJS API (Puerto 3001) ✅
**Base de datos:** PostgreSQL  
**Endpoints:** Recetas (Meals) y Películas (Movies)

**Archivos creados:**
- ✅ `src/main.ts` - Entry point con configuración Swagger
- ✅ `src/app.module.ts` - Módulo principal con TypeORM y ConfigModule
- ✅ `src/seed.ts` - Script de seed con datos de ejemplo
- ✅ `src/meals/meal.entity.ts` - Entidad de recetas
- ✅ `src/meals/meals.controller.ts` - Controlador REST con validaciones
- ✅ `src/meals/meals.service.ts` - Lógica de negocio con manejo de errores
- ✅ `src/meals/meals.module.ts` - Módulo de recetas
- ✅ `src/meals/dto/search-meal.dto.ts` - DTOs de validación
- ✅ `src/movies/movie.entity.ts` - Entidad de películas
- ✅ `src/movies/movies.controller.ts` - Controlador REST con validaciones
- ✅ `src/movies/movies.service.ts` - Lógica de negocio con manejo de errores
- ✅ `src/movies/movies.module.ts` - Módulo de películas
- ✅ `src/movies/dto/search-movie.dto.ts` - DTOs de validación
- ✅ `package.json` - Con script de seed y dependencias actualizadas
- ✅ `tsconfig.json` - Configuración TypeScript
- ✅ `.env.example` - Plantilla de configuración
- ✅ `.gitignore` - Archivos a ignorar

**Características implementadas:**
- ✅ TypeORM con PostgreSQL
- ✅ Swagger documentación en `/api`
- ✅ Validación con DTOs y decoradores
- ✅ Manejo de errores con NotFoundException
- ✅ CORS habilitado
- ✅ Variables de entorno con @nestjs/config
- ✅ Dependencias instaladas correctamente

**Endpoints disponibles:**
- `GET /meals` - Todas las recetas
- `GET /meals/filter?c=category` - Filtrar por categoría
- `GET /meals/lookup?i=id` - Detalle por ID
- `GET /movies` - Todas las películas
- `GET /movies/search?s=title` - Buscar por título
- `GET /movies/title?t=exactTitle` - Buscar por título exacto

---

#### 1.2 Express API (Puerto 3002) ✅
**Base de datos:** MongoDB  
**Endpoints:** Pokémon

**Archivos creados:**
- ✅ `server.js` - Entry point refactorizado y organizado
- ✅ `config/database.js` - Conexión MongoDB separada
- ✅ `config/swagger.js` - Configuración Swagger separada
- ✅ `models/pokemon.model.js` - Modelo Mongoose
- ✅ `routes/pokemon.routes.js` - Rutas REST con validaciones mejoradas
- ✅ `seed.js` - Script de seed con 5 pokémon
- ✅ `package.json` - Con script de seed
- ✅ `.env.example` - Plantilla de configuración
- ✅ `.gitignore` - Archivos a ignorar

**Características implementadas:**
- ✅ Mongoose ODM con MongoDB
- ✅ Swagger documentación en `/api-docs`
- ✅ Validación de parámetros (ID, nombres, límites)
- ✅ Manejo de errores mejorado (400, 404, 500)
- ✅ CORS habilitado
- ✅ Configuración modular separada
- ✅ Límites de paginación (max 100)
- ✅ Dependencias instaladas correctamente

**Endpoints disponibles:**
- `GET /pokemon?limit=12&offset=0` - Lista con paginación
- `GET /pokemon/:id` - Detalle por ID
- `GET /pokemon/name/:name` - Detalle por nombre

---

#### 1.3 FastAPI (Puerto 8000) ✅
**Base de datos:** SQLite  
**Endpoints:** Noticias (News)

**Archivos creados:**
- ✅ `main.py` - Entry point refactorizado con dependency injection
- ✅ `config.py` - Configuración centralizada con Settings class
- ✅ `database.py` - Configuración SQLite
- ✅ `models.py` - Modelos SQLAlchemy
- ✅ `schemas.py` - Schemas Pydantic separados
- ✅ `seed.py` - Script de seed con 5 noticias
- ✅ `requirements.txt` - Dependencias actualizadas (versiones compatibles con Windows)
- ✅ `.env.example` - Plantilla de configuración
- ✅ `.gitignore` - Archivos a ignorar

**Características implementadas:**
- ✅ SQLAlchemy ORM con SQLite
- ✅ OpenAPI documentación automática en `/docs` y `/redoc`
- ✅ Pydantic schemas separados (Create, Response, List)
- ✅ Dependency injection con `Depends(get_db)`
- ✅ Validación con Query parameters
- ✅ Manejo de errores con HTTPException
- ✅ CORS habilitado
- ✅ Configuración centralizada
- ✅ Status codes apropiados (201 en POST)
- ✅ Dependencias instaladas correctamente (con wheels precompilados)

**Endpoints disponibles:**
- `GET /news?limit=10&offset=0&category=tech` - Lista con filtros
- `GET /news/{id}` - Detalle por ID
- `GET /news/top/stories?limit=10` - Top noticias por score
- `POST /news` - Crear noticia (testing)

---

#### 1.4 Documentación y Organización ✅

**Archivos de documentación:**
- ✅ `backend/README.md` - Documentación completa con:
  - Estructura detallada de cada API
  - Tecnologías utilizadas
  - Características principales
  - Scripts de instalación
  - Guía de uso
  - Endpoints documentados
  - Troubleshooting
- ✅ `backend/DATABASE_SETUP.md` - Guía paso a paso para:
  - Instalación de PostgreSQL
  - Instalación de MongoDB
  - Configuración de SQLite
  - Configuración de archivos .env
  - Comandos de seed
  - Verificación de APIs
  - Solución de problemas

**Limpieza realizada:**
- ✅ Eliminado código muerto de `backend/` (server.js, package.json obsoletos)
- ✅ Organizada configuración en archivos separados
- ✅ Creados DTOs y schemas en archivos dedicados
- ✅ Mejorado manejo de errores en todas las APIs
- ✅ Añadidas validaciones consistentes

---

## 🔄 EN PROGRESO

### 2. Instalación y Configuración de Bases de Datos

**Estado actual:**
- ✅ Todas las dependencias de Node.js instaladas
- ✅ Todas las dependencias de Python instaladas (FastAPI)
- ⏸️ PostgreSQL - NO configurado aún
- ⏸️ MongoDB - NO configurado aún
- ✅ SQLite - Listo para usar (no requiere instalación)

**Próximos pasos inmediatos:**
1. Verificar si PostgreSQL está instalado
2. Verificar si MongoDB está instalado
3. Crear bases de datos necesarias
4. Configurar archivos `.env` en cada API
5. Ejecutar scripts de seed
6. Probar que las 3 APIs funcionen

---

## ⏳ PENDIENTE

### 3. Testing de Backend (0% Completado)

**Tareas:**
- [ ] Probar FastAPI (más simple, solo requiere SQLite)
  - [ ] Ejecutar `python seed.py`
  - [ ] Iniciar servidor con `uvicorn main:app --reload --port 8000`
  - [ ] Verificar http://localhost:8000/docs
  - [ ] Probar endpoints en Swagger UI

- [ ] Configurar y probar Express API
  - [ ] Instalar MongoDB si no está instalado
  - [ ] Crear base de datos `pokemon_db`
  - [ ] Crear archivo `.env`
  - [ ] Ejecutar `npm run seed`
  - [ ] Iniciar servidor con `npm start`
  - [ ] Verificar http://localhost:3002/api-docs

- [ ] Configurar y probar NestJS API
  - [ ] Instalar PostgreSQL si no está instalado
  - [ ] Crear base de datos `infomovil_db`
  - [ ] Crear archivo `.env`
  - [ ] Ejecutar `npm run seed`
  - [ ] Iniciar servidor con `npm start`
  - [ ] Verificar http://localhost:3001/api

---

### 4. Frontend - Modificación (0% Completado)

**Objetivo:** Modificar el frontend del Taller 1 para consumir las APIs locales en lugar de las externas.

**Archivos a modificar:**
- [ ] `frontend/api/themealdb.js` → Cambiar a `http://localhost:3001/meals`
- [ ] `frontend/api/omdbapi.js` → Cambiar a `http://localhost:3001/movies`
- [ ] `frontend/api/pokeapi.js` → Cambiar a `http://localhost:3002/pokemon`
- [ ] `frontend/api/newsapi.js` → Crear nuevo para `http://localhost:8000/news`

**Tareas:**
- [ ] Revisar estructura actual del frontend
- [ ] Adaptar llamadas a APIs para usar endpoints locales
- [ ] Ajustar formato de respuestas si es necesario
- [ ] Probar funcionalidad completa del frontend
- [ ] Verificar que todas las secciones funcionen:
  - [ ] Recetas
  - [ ] Películas
  - [ ] Pokémon
  - [ ] Noticias (nueva sección)

---

### 5. Apache Cordova - Empaquetado APK (0% Completado)

**Tareas:**
- [ ] Instalar Cordova CLI globalmente
- [ ] Instalar Android SDK / Android Studio
- [ ] Crear proyecto Cordova
- [ ] Configurar plataforma Android
- [ ] Copiar archivos compilados del frontend
- [ ] Configurar config.xml
- [ ] Configurar permisos necesarios
- [ ] Compilar APK de desarrollo
- [ ] Probar en emulador o dispositivo
- [ ] Compilar APK de producción (firmado)

---

## 📊 PROGRESO GENERAL

### Punto 1: Backend/APIs - 85% Completado ✅
- [x] Estructura de 3 APIs (100%)
- [x] Código organizado y limpio (100%)
- [x] Documentación completa (100%)
- [x] Dependencias instaladas (100%)
- [ ] Bases de datos configuradas (0%)
- [ ] APIs probadas y funcionando (0%)

### Punto 2: Frontend - 0% Completado ⏳
- [ ] Análisis de código actual
- [ ] Modificación de llamadas a APIs
- [ ] Pruebas de integración
- [ ] Ajustes de UI si necesario

### Punto 3: Cordova/APK - 0% Completado ⏳
- [ ] Instalación de herramientas
- [ ] Configuración de proyecto
- [ ] Compilación de APK
- [ ] Testing en dispositivo

---

## 🛠️ STACK TECNOLÓGICO

### Backend
- **NestJS 10.x** + TypeScript 5.x + PostgreSQL + TypeORM
- **Express 4.x** + Node.js + MongoDB + Mongoose
- **FastAPI 0.121.x** + Python 3.14 + SQLite + SQLAlchemy + Pydantic

### Frontend (Taller 1)
- HTML5 + CSS3 + JavaScript vanilla
- Tailwind CSS
- APIs externas (a migrar)

### Mobile
- Apache Cordova (pendiente)
- Android SDK (pendiente)

---

## 📝 NOTAS TÉCNICAS

### Decisiones de Arquitectura
1. **Separación de responsabilidades**: Cada API en su propia carpeta con configuración independiente
2. **Configuración modular**: Config, routes/controllers, models/entities en archivos separados
3. **DTOs y validación**: NestJS usa class-validator, FastAPI usa Pydantic, Express usa validación manual
4. **Manejo de errores**: Códigos HTTP apropiados (400, 404, 500) con mensajes descriptivos
5. **Documentación automática**: Swagger para NestJS/Express, OpenAPI para FastAPI

### Problemas Resueltos
1. ✅ Error de compilación Rust en pydantic-core → Solucionado con versiones más nuevas (wheels precompilados)
2. ✅ Código muerto en backend/ → Eliminado completamente
3. ✅ Configuración dispersa → Centralizada en archivos config
4. ✅ Falta de validaciones → Añadidas en todas las APIs
5. ✅ Errores TypeScript en NestJS → Normales hasta ejecutar (dependencias instaladas)

### Advertencias Actuales
- ⚠️ PostgreSQL y MongoDB necesitan instalación y configuración manual
- ⚠️ Archivos `.env` deben crearse desde `.env.example`
- ⚠️ Los seeds solo funcionan después de configurar las bases de datos

---

## 🎯 SIGUIENTE ACCIÓN RECOMENDADA

**PRIORIDAD 1:** Probar FastAPI (no requiere configuración de DB)
```powershell
cd backend/fastapi-api
.\venv\Scripts\Activate.ps1
python seed.py
python -m uvicorn main:app --reload --port 8000
# Visitar: http://localhost:8000/docs
```

**PRIORIDAD 2:** Instalar y configurar MongoDB para Express API

**PRIORIDAD 3:** Instalar y configurar PostgreSQL para NestJS API

---

## 📅 HISTORIAL DE CAMBIOS

### 2025-11-10
- ✅ Creadas 3 APIs completas (NestJS, Express, FastAPI)
- ✅ Organizado código y eliminado archivos obsoletos
- ✅ Creados DTOs, schemas y configuraciones separadas
- ✅ Mejorado manejo de errores y validaciones
- ✅ Documentación completa en README y DATABASE_SETUP
- ✅ Instaladas todas las dependencias (Node.js y Python)
- ✅ Solucionado problema de pydantic-core en Windows

---

**Última actualización:** 10 de Noviembre, 2025  
**Estado general:** Backend 85% completo, Frontend 0%, Cordova 0%  
**Próximo milestone:** Configurar bases de datos y probar las 3 APIs
