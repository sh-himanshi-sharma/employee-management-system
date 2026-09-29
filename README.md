# MERN Stack Authentication System - Employee Management System

A robust, secure, and production-ready **MERN (MongoDB, Express, React, Node.js)** Stack Authentication System featuring JWT Auth, Bcrypt password hashing, Mongoose Schema validation, and a sleek Bootstrap 5 UI.

---

## 📁 Project Structure

```
employee management system/
├── backend/
│   ├── config/
│   │   └── db.js               # MongoDB Mongoose Connection
│   ├── controllers/
│   │   └── authController.js   # Login & Profile Controller logic
│   ├── middleware/
│   │   ├── authMiddleware.js   # JWT Protect Middleware
│   │   └── errorMiddleware.js  # Global error & 404 handlers
│   ├── models/
│   │   └── Admin.js            # Admin Schema & bcrypt password hashing
│   ├── routes/
│   │   └── authRoutes.js       # Auth Routes (POST /login, GET /profile)
│   ├── seed/
│   │   └── createAdmin.js      # Seed script to seed default admin user
│   ├── .env.example
│   ├── .env
│   ├── app.js                  # Express App Setup
│   ├── server.js               # Server Entrypoint
│   └── package.json
└── frontend/
    ├── src/
    │   ├── api/
    │   │   └── authApi.js      # Axios client with JWT request interceptor
    │   ├── components/
    │   │   └── ProtectedRoute.jsx # Auth Guard Route Component
    │   ├── context/
    │   │   └── AuthContext.jsx # Auth State Provider & LocalStorage Sync
    │   ├── pages/
    │   │   ├── Login.jsx       # Glassmorphism Bootstrap Login Page
    │   │   └── Dashboard.jsx   # Admin Welcome Dashboard & Logout
    │   ├── routes/
    │   │   └── AppRoutes.jsx   # React Router Config
    │   ├── App.jsx
    │   ├── index.css           # Modern Design Tokens & Styling
    │   └── main.jsx
    ├── .env.example
    ├── .env
    ├── index.html
    ├── vite.config.js
    └── package.json
```

---

## ⚡ Quick Start & Run Instructions

### Prerequisites
- **Node.js** (v16+ recommended)
- **MongoDB** running locally on `mongodb://127.0.0.1:27017` or a MongoDB Atlas connection string.

---

### Step 1: Set Up and Start Backend

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Seed Default Admin User:
   ```bash
   npm run seed
   ```
   *Output:*
   ```
   MongoDB Connected: 127.0.0.1
   ✅ Default Admin created successfully!
   -----------------------------------
   Credentials:
   Username: admin
   Password: admin123
   -----------------------------------
   ```

4. Start Backend Server:
   ```bash
   npm run dev
   # or npm start
   ```
   *The backend will start on `http://localhost:5000`.*

---

### Step 2: Set Up and Start Frontend

1. Open a new terminal and navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start Vite Development Server:
   ```bash
   npm run dev
   ```
   *The frontend will run at `http://localhost:3000` (or `http://localhost:5173`).*

---

## 🔑 Default Credentials

- **Username**: `admin`
- **Password**: `admin123`

---

## 🧪 API Endpoints & Testing Examples

### 1. Admin Login API
- **Endpoint**: `POST /api/auth/login`
- **Access**: Public
- **Request Body**:
  ```json
  {
    "username": "admin",
    "password": "admin123"
  }
  ```
- **Response (`200 OK`)**:
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "username": "admin"
    }
  }
  ```

#### cURL Example:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"username\": \"admin\", \"password\": \"admin123\"}"
```

---

### 2. Verify Profile (Protected)
- **Endpoint**: `GET /api/auth/profile`
- **Access**: Private (Requires `Authorization: Bearer <token>`)
- **Headers**:
  ```
  Authorization: Bearer <YOUR_JWT_TOKEN>
  ```
- **Response (`200 OK`)**:
  ```json
  {
    "user": {
      "id": "660000000000000000000000",
      "username": "admin",
      "createdAt": "2026-09-29T10:00:00.000Z"
    }
  }
  ```

#### cURL Example:
```bash
curl -X GET http://localhost:5000/api/auth/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

---

## 🛡️ Security & Architecture Features
- **Bcrypt Password Hashing**: Passwords are standardly hashed with a salt factor of 10 prior to persistence. Plaintext passwords are never stored.
- **JWT Authentication**: Json Web Tokens are signed using a configurable secret key (`JWT_SECRET`) and expire after 1 hour.
- **Axios Request Interceptor**: Automatically appends `Authorization: Bearer <token>` to outbound API requests.
- **Persistent Session Handling**: Token and basic user info persist in `localStorage` across page reloads and browser restarts.
- **Route Protection Guard**: Unauthenticated users trying to navigate to `/dashboard` are instantly redirected to `/login`.
