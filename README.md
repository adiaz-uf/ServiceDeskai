<!-- README generado automáticamente -->
# ServiceDeskai

**ServiceDeskai** es una aplicación de ticketing para reportes de incidencias en oficinas (subida de fotos, generación automática de descripción con Gemini, gestión por roles y seguimiento).

**Stack principal**
- Frontend: React + TypeScript + Vite
- Backend: Node.js + Express + TypeScript
- Base de datos: MongoDB (con `mongo-express` para GUI)
- Contenedores: `docker compose` (configurado en `docker-compose.yml`)

**Estructura principal del repositorio**
- `backend/` — servidor Express en TypeScript, rutas, modelos, lógica de reportes y subida de imágenes con `multer`.
- `frontend/` — app React + Vite, interfaz para crear/visualizar reportes y gestionar estado según rol.
- `mongodb/` — scripts de inicialización
- `docker-compose.yml` — orquesta `frontend`, `backend`, `mongodb`, `mongo-express`.
- `Makefile` — comandos de conveniencia para levantar/limpiar el stack.

**Características relevantes**
- Creación de reportes con imagen y descripción opcional.
- Si no se proporciona descripción, el backend intenta generar una con Gemini (API de Google) a partir de la imagen.
- Roles: `user`, `service_desk`, `admin` (control de acceso en backend y controles UI en frontend).
- Las imágenes se guardan en una carpeta local redireccionada a un volumen Docker (`UPLOADS_FOLDER`).

**Variables de entorno importantes (.env)**
Los valores de ejemplo están en tu archivo `.env`. Los más relevantes:
- `MONGODB_URI` — URI de conexión a MongoDB.
- `BACKEND_URL` — URL base pública del backend (ej: `http://localhost`).
- `BACKEND_PORT` — puerto del backend (ej: `9000`).
- `VITE_BACKEND_PORT` / `VITE_API_URL` — configuración para el frontend.
- `UPLOADS_FOLDER` — carpeta en host para almacenar imágenes (la usa `docker-compose` como volumen).
- `GEMINI_API_KEY` — clave para la API de Gemini (necesaria si quieres la generación automática).
- `JWT_SECRET`, `ACCESS_TOKEN_EXPIRATION`, `REFRESH_TOKEN_EXPIRATION` — auth.

Nota: si alguno de los valores anteriores (p.ej. `BACKEND_URL` o `BACKEND_PORT`) no está definido, algunas funciones (p.ej. generación de descripción desde imágenes) fallarán con errores claros.

**Cómo lanzar el proyecto (usando `Makefile`)**

Requisitos en la máquina host:
- `docker` y `docker compose` instalados
- `make` (habitualmente disponible en Linux/macOS)

Comandos útiles (desde la raíz del repo):

1) Levantar todo en background (crea la carpeta de uploads definida por `UPLOADS_FOLDER`):

```
make up
```

2) Parar los contenedores:

```
make down
```

3) Parada completa y limpieza de volúmenes:

```
make fclean
```

4) Reconstruir todo (quita, reconstruye y levanta):

```
make re
```

5) Reconstruir sólo backend o frontend:

```
make re-backend
make re-frontend
```

6) Logs y estado

```
make logs       # logs de todos los servicios (seguimiento)
make lb         # logs del backend
make lf         # logs del frontend
make ps         # ver contenedores
```

7) Reset de la base de datos:

```
make db-reset
```

**URLs útiles (por defecto según `.env`)**
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:9000` (ajusta `BACKEND_URL`/`BACKEND_PORT` si modificas)
- Mongo Express (GUI): `http://localhost:8081`
- Imágenes subidas: `http://<BACKEND_URL>:<BACKEND_PORT>/uploads/<filename>`


**Dependencias y SDKs de IA**
- En `backend/package.json` está `@google/generative-ai` y la app usa la variable `GEMINI_API_KEY` para llamar a Gemini. Asegúrate de tener la clave configurada en `.env`.


**API - Endpoints principales (detalle)**

Base path: `/api/v1`

Auth
- 🟦 `POST /api/v1/auth/register` — Registrar nuevo usuario. Body: `{ name, email, username, password }`. Validación aplicada. (Público)
- 🟦 `POST /api/v1/auth/login` — Iniciar sesión. Body: `{ username, password }`. Devuelve tokens JWT. (Público)
- 🟦 `POST /api/v1/auth/logout` — Cerrar sesión / invalidar refresh token. Requiere JWT.

Reports
- 🟦 `POST /api/v1/reports` — Crear un nuevo reporte. Tipo: `multipart/form-data`. Campos: `image` (file), `office` (id), `description` (opcional), `sharedWith` (email opcional). Requiere JWT.
- 🟩 `GET /api/v1/reports` — Obtener historial de reportes. Si el usuario tiene rol `user`, devuelve solo sus reportes; roles `service_desk`/`admin` ven todos. Requiere JWT.
- 🟩 `GET /api/v1/reports/:id` — Obtener detalles de un reporte por id. Requiere JWT y control de acceso (usuario propietario o roles administrativos).
- 🟨 `PATCH /api/v1/reports/:id/status` — Actualizar estado del reporte. Body: `{ status }` donde `status` es uno de `open | assigned | in-progress | closed`. Requiere JWT y rol `service_desk` o `admin`.

Offices
- 🟦 `POST /api/v1/offices` — Crear una oficina. Requiere JWT y rol `admin`.
- 🟩 `GET /api/v1/offices` — Listar todas las oficinas. Requiere JWT.

Profile / Usuarios
- 🟩 `GET /api/v1/profile` — Obtener perfil del usuario autenticado. Requiere JWT.
- 🟦 `PUT /api/v1/profile` — Actualizar perfil (nombre, email, username, etc.). Requiere JWT.
- 🟦 `POST /api/v1/profile/users` — Crear usuario (para administradores). Body: datos del usuario. Requiere JWT y rol `admin`.
- 🟩 `GET /api/v1/profile/users` — Listar usuarios (solo `admin`). Requiere JWT y rol `admin`.

Archivos / Imágenes
- 🟩 Las imágenes subidas se sirven desde la ruta pública `/uploads/<filename>` en el backend. URL completa por defecto: `http://<BACKEND_URL>:<BACKEND_PORT>/uploads/<filename>`.