
# 📋 Gestión de Tareas con Autenticación y SSR

Aplicación web full stack para la gestión personal de tareas, con registro e inicio de sesión. Implementa autenticación segura mediante JWT y cookies httpOnly, utiliza SSR con Next.js para un rendimiento óptimo, y ofrece modo oscuro con Tailwind CSS.

---

## 🚀 Tecnologías utilizadas

**Backend:**

- Python 3
- Flask
- Flask-JWT-Extended (autenticación JWT)
- Flask-CORS

**Frontend:**

- Next.js (SSR y App Router)
- React
- SWR (fetching y cache de datos)
- Tailwind CSS (incluye modo oscuro)
- Context API (estado global)

---

## 📦 Estructura del proyecto
```
gestion-tareas-con-autenticacion/
│
├── backend/
│   ├── app.py # Punto de entrada Flask
│   ├── config.py # Configuración de la app
│   ├── routes/ # Endpoints API
│   ├── managers/ # Lógica de negocio y CRUD
│   ├── models/ # Clases User, Task, etc.
│   ├── utils/ # Utilidades varias
│   └── requirements.txt # Dependencias Python
│
└── frontend/
    ├── app/ # Páginas y rutas Next.js
    ├── components/ # Componentes React reutilizables
    ├── context/ # Context API para estado global
    ├── styles/ # Estilos Tailwind y CSS
    ├── tailwind.config.js # Configuración Tailwind CSS
    ├── package.json # Dependencias Node.js
    └── ...
```
---

## ⚙️ Instalación y puesta en marcha

### 1. Clona el repositorio

```bash
git clone https://github.com/CarlotadeMiguel/gestion-tareas-con-autenticacion.git
cd gestion-tareas-con-autenticacion
```

### 2. Configura y ejecuta el backend

```bash
cd backend
python -m venv venv

# Activa el entorno virtual:
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

pip install -r requirements.txt

# Crea un archivo .env con las variables necesarias (ver .env.example)
# Inicia el servidor Flask:
python app.py
```

El backend correrá por defecto en http://localhost:5000.

### 3. Configura y ejecuta el frontend

```bash
cd ../frontend
npm install
npm run dev
```

El frontend estará disponible en http://localhost:3000.

---

## 🔐 Funcionalidades principales

### Registro y autenticación de usuarios

- Usuarios pueden crear cuenta e iniciar sesión.
- Tokens JWT almacenados en cookies httpOnly para seguridad.

### Gestión de tareas personalizadas

- Crear nuevas tareas con título y descripción.
- Listar tareas paginadas.
- Eliminar tareas.

### Server-Side Rendering (SSR) y protección de rutas

- La página de tareas /tasks solo es accesible para usuarios autenticados.
- SSR para mejorar SEO y tiempos de carga.

### UI reactiva y optimista

- Actualización instantánea tras crear o borrar tareas sin recargar.

### Modo oscuro

- Cambia entre temas claro y oscuro desde cualquier lugar de la app.

### Seguridad y validación

- Formularios con validación.
- Rutas protegidas y separación clara de datos por usuario.
- Uso de cookies seguras y HttpOnly.

---

## 🗂️ Arquitectura y clases (backend)

**User**  
Representa a un usuario, con gestión de credenciales y tareas.

**Task**  
Modelo de tarea con ID único, título y descripción.

**TaskManager**  
Lógica CRUD para las tareas (crear, leer, eliminar).

**AuthManager**  
Manejo de registro, login y validación de usuarios.

**DataStore**  
Simulación en memoria de base de datos para almacenamiento temporal.

---

## 📄 Archivo .env.example

```env
# Configuración Flask
FLASK_ENV=development
FLASK_DEBUG=1
SECRET_KEY=tu_clave_secreta_aqui

# JWT settings
JWT_SECRET_KEY=tu_jwt_secreto_aqui

# Configuración CORS (opcional)
CORS_ORIGINS=http://localhost:3000
```

---

## 🚀 Instrucciones para producción

### Backend (Flask)

```bash
python -m venv venv
source venv/bin/activate  # o venv\Scripts\activate en Windows
pip install -r requirements.txt
```

Crear archivo .env con valores seguros.

Ejecutar con Gunicorn (o servidor WSGI similar):

```bash
pip install gunicorn
gunicorn -w 4 app:app
```

### Frontend (Next.js)

```bash
npm install
npm run build
npm start
```

---

## 🤝 Contribuciones

¡Contribuciones y sugerencias son bienvenidas!  
Por favor abre un issue o pull request para colaborar.

---

## 📝 Licencia

Este proyecto está bajo licencia MIT.
