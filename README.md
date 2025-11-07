# 🧩 Backend Developer Assignment – Django REST API

## 📘 Overview
This project was built as part of the **Backend Developer Internship Assignment**.  
It demonstrates a scalable and secure backend system with:
- JWT-based Authentication  
- Role-Based Access (Admin / User)  
- CRUD APIs for Tasks  
- Swagger API Documentation  
- MySQL Database Integration  
- Vanilla JS Frontend for Testing APIs  

---

## ⚙️ Tech Stack
- **Backend:** Django, Django REST Framework (DRF)
- **Auth:** JWT (via `rest_framework_simplejwt`)
- **Database:** MySQL
- **Frontend:** HTML + Bootstrap + Vanilla JavaScript
- **Docs:** Swagger (drf_yasg)
- **Others:** dotenv, CORS headers

---

## 🚀 Features Implemented

### 🔑 Authentication
- User Registration with password hashing  
- JWT-based Login (access + refresh tokens)
- Role-based access (`is_admin` flag in User model)

### 📋 Task Management
- CRUD APIs for Tasks
- Each user can manage their own tasks
- Admins can view, edit, or delete all tasks

### 🧱 Security
- JWT protected routes
- Input validation and sanitization
- Custom permissions for ownership and admin access

### 🌐 Frontend
- Simple UI to register, login, and manage tasks
- JWT stored securely in localStorage
- Real-time task creation/deletion integrated with backend

---

## 🧩 API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|-----------|--------------|----------------|
| POST | `/api/v1/accounts/register/` | Register new user | ❌ |
| POST | `/api/v1/token/` | Login and get JWT tokens | ❌ |
| GET | `/api/v1/accounts/me/` | Get current user info | ✅ |
| GET | `/api/v1/tasks/` | List all tasks | ✅ |
| POST | `/api/v1/tasks/` | Create new task | ✅ |
| PUT | `/api/v1/tasks/{id}/` | Update task | ✅ |
| DELETE | `/api/v1/tasks/{id}/` | Delete task | ✅ |

---

## 🧪 API Documentation
- Swagger UI → [http://127.0.0.1:8000/api/docs/](http://127.0.0.1:8000/api/docs/)
- OpenAPI Spec → `docs/openapi.json`
- Postman Collection → `docs/postman_collection.json` (optional)

---

## 🧠 Scalability & Deployment Notes

### Scalability
- Modular app structure (accounts, tasks) for microservice expansion
- DB-agnostic via ORM (easily switch to PostgreSQL or MongoDB)
- JWT stateless authentication allows horizontal scaling (load-balanced servers)
- Can add caching (Redis) for performance
- Future-ready for containerization (Docker)

### Security
- Passwords hashed via Django’s `AbstractUser`
- JWT expiration and refresh token flow
- CORS and CSRF configured for frontend access
- Environment variables handled securely via `.env`

### Deployment
- Can run via Docker Compose (`Django + MySQL`)
- Easily deployable on platforms like Render, Railway, or AWS EC2

---

## ⚡ Setup Instructions

### 1️⃣ Clone the repository
```bash
git clone https://github.com/AniketSonawane11/BackendAssignment-Aniket.git
cd BackendAssignment-Aniket
