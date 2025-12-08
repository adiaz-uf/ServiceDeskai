# 🛠️ ServiceDesk AI

<div align="center">

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

**Sistema inteligente de gestión de incidencias IT con análisis de imágenes impulsado por IA**

</div>

---

## ✨ Características Principales

| Feature | Descripción |
|---------|-------------|
| 🤖 **Análisis IA de Imágenes** | Integración con Google Gemini para analizar automáticamente fotos de incidencias y generar descripciones |
| 🎫 **Gestión de Tickets** | Sistema completo de creación, seguimiento y resolución de reportes de incidencias |
| 👥 **Sistema de Roles** | Control de acceso basado en roles: `admin`, `service_desk` y `user` |
| 🏢 **Gestión de Oficinas** | Administración de múltiples sedes con geolocalización |
| 📧 **Notificaciones Email** | Envío automático de emails al compartir reportes |
| 📸 **Upload de Imágenes** | Subida y almacenamiento de evidencias fotográficas |
| 🔐 **Autenticación JWT** | Sistema seguro de login con tokens de acceso y refresh |

---

## 🏗️ Stack Tecnológico

### Frontend
- **React 18** con TypeScript
- **Vite** como bundler
- **TailwindCSS** para estilos
- **Redux Toolkit** para gestión de estado
- **React Router** para navegación
- **Leaflet** para mapas interactivos

### Backend  
- **Node.js** con Express 5
- **TypeScript** 
- **MongoDB** con Mongoose ODM
- **JWT** para autenticación
- **Multer** para subida de archivos
- **Zod** para validación de schemas
- **Nodemailer** para emails
- **Google Generative AI** (Gemini 2.5 Flash)

### Infraestructura
- **Docker** & **Docker Compose**
- **Mongo Express** como GUI de base de datos

---

## 📁 Estructura del Proyecto

```
ServiceDeskai/
├── 📂 backend/
│   ├── src/
│   │   ├── config/          # Configuración DB y Multer
│   │   ├── controllers/     # Controladores de rutas
│   │   ├── middleware/      # Auth, validación, roles
│   │   ├── models/          # Modelos Mongoose (User, Report, Office)
│   │   ├── routes/          # Definición de endpoints
│   │   ├── schemas/         # Schemas Zod para validación
│   │   ├── services/        # Lógica de negocio
│   │   └── server.ts        # Punto de entrada
│   ├── Dockerfile
│   └── package.json
│
├── 📂 frontend/
│   ├── src/
│   │   ├── config/          # Configuraciones
│   │   ├── general-components/  # Componentes reutilizables
│   │   ├── layouts/         # Layouts de páginas
│   │   ├── pages/           # Páginas de la app
│   │   ├── services/        # API calls
│   │   ├── store/           # Redux store
│   │   ├── App.tsx          # Componente principal
│   │   └── main.tsx         # Punto de entrada
│   ├── Dockerfile
│   └── package.json
│
├── 📂 mongodb/
│   └── init-mongo.js        # Script de inicialización
│
├── docker-compose.yml
├── Makefile
├── .env                     # Variables de entorno (no incluido)
└── .env-example             # Ejemplo de configuración
```

---

## 🌐 API Endpoints

### 🔐 Autenticación (`/api/v1/auth`)

| Método | Endpoint | Descripción | Roles |
|--------|----------|-------------|-------|
| `POST` | `/register` | Registrar nuevo usuario | `admin` |
| `POST` | `/login` | Iniciar sesión | Público |
| `POST` | `/logout` | Cerrar sesión | Autenticado |

### 🎫 Reportes (`/api/v1/reports`)

| Método | Endpoint | Descripción | Roles |
|--------|----------|-------------|-------|
| `POST` | `/` | Crear nuevo reporte (con imagen) | Autenticado |
| `GET` | `/` | Obtener historial de reportes | Autenticado |
| `GET` | `/:id` | Obtener detalles de un reporte | Autenticado |
| `PATCH` | `/:id/status` | Actualizar estado del reporte | `service_desk`, `admin` |

**Estados disponibles:** `open` → `assigned` → `in-progress` → `closed`

### 🏢 Oficinas (`/api/v1/offices`)

| Método | Endpoint | Descripción | Roles |
|--------|----------|-------------|-------|
| `POST` | `/` | Crear nueva oficina | `admin` |
| `GET` | `/` | Listar todas las oficinas | Autenticado |

---

## 🚀 Instalación y Uso

### Prerrequisitos

- Docker & Docker Compose
- Make (opcional, para usar comandos simplificados)

### 1. Clonar el repositorio

```bash
git clone https://github.com/adiaz-uf/ServiceDeskai.git
cd ServiceDeskai
```

### 2. Configurar variables de entorno

```bash
cp .env-example .env
# Editar .env con tus configuraciones
```

### 3. Iniciar los servicios

```bash
# Usando Make
make up

# O usando Docker Compose directamente
docker compose up -d --build
```

### 4. Acceder a la aplicación

| Servicio | URL |
|----------|-----|
| 🌐 Frontend | http://localhost:3000 |
| 🔧 Backend API | http://localhost:9000/api/v1 |
| 🗄️ Mongo Express | http://localhost:8081 |

---

## ⚙️ Comandos Makefile

```bash
make up          # Levantar todos los contenedores
make down        # Parar contenedores
make fclean      # Limpiar todo (volumes, etc.)
make re          # Reconstruir desde cero

make re-backend  # Reconstruir solo backend
make re-frontend # Reconstruir solo frontend
make db-reset    # Resetear base de datos

make logs        # Ver logs de todos los servicios
make lf          # Logs de frontend
make lb          # Logs de backend  
make ld          # Logs de MongoDB
make ps          # Estado de contenedores
```

---

## 🔧 Configuración de Email (Opcional)

Para habilitar las notificaciones por email, configura en tu `.env`:

```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=tu-email@gmail.com
EMAIL_PASS=tu-app-password
```

> **Nota:** Para Gmail, necesitas generar una [contraseña de aplicación](https://support.google.com/accounts/answer/185833).

---

## 🤖 Configuración de Gemini AI

1. Obtén una API key en [Google AI Studio](https://aistudio.google.com/apikey)
2. Añádela a tu `.env`:

```env
GEMINI_API_KEY=tu-api-key
```

La IA analizará automáticamente las imágenes de los reportes y generará descripciones cuando no se proporcione una manualmente.

---

## 📝 Licencia

Este proyecto está bajo la licencia ISC.

---

<div align="center">

**Hecho con ❤️ para mejorar la gestión de incidencias IT**

</div>
