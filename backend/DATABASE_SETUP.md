# Guía de Configuración de Bases de Datos

Esta guía te ayudará a configurar las tres bases de datos necesarias para el backend del proyecto.

## 1. PostgreSQL (NestJS API - Puerto 3001)

### Instalación de PostgreSQL

**Windows:**
1. Descarga PostgreSQL desde: https://www.postgresql.org/download/windows/
2. Ejecuta el instalador y sigue las instrucciones
3. Recuerda la contraseña que configures para el usuario `postgres`

**Linux/Mac:**
```bash
# Linux (Ubuntu/Debian)
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib

# Mac (usando Homebrew)
brew install postgresql
brew services start postgresql
```

### Configuración

1. Abre pgAdmin o conecta por terminal:
```bash
psql -U postgres
```

2. Crea la base de datos:
```sql
CREATE DATABASE infomovil_db;
```

3. Crea un archivo `.env` en `backend/nestjs-api/` basado en `.env.example`:
```env
PORT=3001
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=tu_contraseña_aqui
DB_DATABASE=infomovil_db
```

4. Instala las dependencias:
```bash
cd backend/nestjs-api
npm install
```

5. Ejecuta el seed para poblar la base de datos:
```bash
npm run seed
```

6. Inicia el servidor:
```bash
npm start
```

La API estará disponible en: http://localhost:3001
Documentación Swagger: http://localhost:3001/api

---

## 2. MongoDB (Express API - Puerto 3002)

### Instalación de MongoDB

**Windows:**
1. Descarga MongoDB Community Server: https://www.mongodb.com/try/download/community
2. Ejecuta el instalador y sigue las instrucciones
3. Asegúrate de instalar MongoDB como servicio

**Linux:**
```bash
# Ubuntu/Debian
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod
```

**Mac:**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

### Configuración

1. Verifica que MongoDB esté corriendo:
```bash
# Windows
net start MongoDB

# Linux/Mac
sudo systemctl status mongod  # Linux
brew services list  # Mac
```

2. Crea un archivo `.env` en `backend/express-api/` basado en `.env.example`:
```env
PORT=3002
MONGO_URI=mongodb://localhost:27017/pokemon_db
```

3. Instala las dependencias:
```bash
cd backend/express-api
npm install
```

4. Ejecuta el seed para poblar la base de datos:
```bash
npm run seed
```

5. Inicia el servidor:
```bash
npm start
```

La API estará disponible en: http://localhost:3002
Documentación Swagger: http://localhost:3002/api-docs

---

## 3. SQLite (FastAPI - Puerto 8000)

### Instalación

SQLite viene preinstalado en la mayoría de sistemas operativos. Solo necesitas Python 3.9+

**Verificar Python:**
```bash
python --version
# o
python3 --version
```

**Instalar Python (si es necesario):**
- Windows: https://www.python.org/downloads/
- Linux: `sudo apt-get install python3 python3-pip`
- Mac: `brew install python3`

### Configuración

1. Crea un entorno virtual (recomendado):
```bash
cd backend/fastapi-api
python -m venv venv

# Activar el entorno virtual
# Windows (PowerShell):
.\venv\Scripts\Activate.ps1
# Windows (CMD):
.\venv\Scripts\activate.bat
# Linux/Mac:
source venv/bin/activate
```

2. Instala las dependencias:
```bash
pip install -r requirements.txt
```

3. Crea un archivo `.env` (opcional, SQLite usa valores por defecto):
```env
DATABASE_URL=sqlite:///./news.db
```

4. Ejecuta el seed para poblar la base de datos:
```bash
python seed.py
```

5. Inicia el servidor:
```bash
uvicorn main:app --reload --port 8000
```

La API estará disponible en: http://localhost:8000
Documentación OpenAPI: http://localhost:8000/docs
Documentación alternativa: http://localhost:8000/redoc

---

## Verificación de las 3 APIs

Una vez que todas las APIs estén corriendo, verifica que funcionen:

### NestJS (Puerto 3001)
```bash
curl http://localhost:3001/meals
curl http://localhost:3001/movies
```

### Express (Puerto 3002)
```bash
curl http://localhost:3002/pokemon
curl http://localhost:3002/pokemon/1
```

### FastAPI (Puerto 8000)
```bash
curl http://localhost:8000/news
curl http://localhost:8000/news/top/stories
```

---

## Solución de Problemas Comunes

### PostgreSQL
- **Error de conexión:** Verifica que el servicio PostgreSQL esté corriendo
- **Error de autenticación:** Revisa usuario y contraseña en `.env`
- **Puerto ocupado:** Cambia el puerto en `.env` si 5432 está ocupado

### MongoDB
- **Error de conexión:** Ejecuta `net start MongoDB` (Windows) o `sudo systemctl start mongod` (Linux)
- **Puerto ocupado:** Cambia el puerto en MONGO_URI si 27017 está ocupado

### SQLite
- **Error de permisos:** Asegúrate de tener permisos de escritura en la carpeta del proyecto
- **Base de datos bloqueada:** Cierra cualquier conexión abierta a news.db

---

## Comandos Útiles

### Ver todas las APIs corriendo simultáneamente
Puedes usar herramientas como `concurrently` o abrir 3 terminales:

Terminal 1:
```bash
cd backend/nestjs-api
npm start
```

Terminal 2:
```bash
cd backend/express-api
npm start
```

Terminal 3:
```bash
cd backend/fastapi-api
uvicorn main:app --reload --port 8000
```

---

## Próximos Pasos

1. ✅ Instalar bases de datos (PostgreSQL, MongoDB)
2. ✅ Configurar archivos `.env`
3. ✅ Instalar dependencias de cada API
4. ✅ Ejecutar scripts de seed
5. ✅ Iniciar las 3 APIs
6. ⏳ Modificar el frontend para consumir las nuevas APIs
7. ⏳ Empaquetar con Cordova
