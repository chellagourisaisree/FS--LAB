# Student Management System (Full Stack)

A complete, production-ready web application to manage student records. Users can add, view, search, update, and delete students with instant persistence.

---

## 🌟 Key Features
- **Zero-Config Database Out-of-the-Box**: Works immediately with built-in persistent local storage (`backend/data/students.json`). No external database setup required!
- **MongoDB Atlas Ready**: If a MongoDB Atlas URI is provided in `backend/.env`, it automatically connects to MongoDB Atlas; otherwise, it seamlessly falls back to the local database without errors or crashes.
- **Full CRUD Support**:
  - **Create**: Add new students with field validation (unique Roll Number, email format, 10-digit phone).
  - **Read**: View students with live search by Name, Roll Number, or Department.
  - **Update**: Edit existing student details.
  - **Delete**: Remove students with confirmation prompt.
- **Interactive Dashboard**: Total student count metric and quick action shortcuts.
- **One-Command Launcher**: Launch both backend and frontend servers with a single command or double-click.

---

## 🚀 Quick Start (Easiest Way)

### Option A: Double-Click (Windows)
Double-click `start.bat` in the project folder. Both the backend and frontend will start automatically!

### Option B: Single Command
In the terminal, run:
```bash
npm start
```
*(or `node start-all.js` inside the `student-management-system` folder)*

Then open your browser to:
**http://localhost:5173**

---

## 🛠 Manual Start (Two Terminals)

If you prefer running backend and frontend in separate terminals:

### Terminal 1: Backend
```bash
cd student-management-system/backend
npm start
```
Backend runs at: `http://localhost:5000`

### Terminal 2: Frontend
```bash
cd student-management-system/frontend
npm run dev
```
Frontend runs at: `http://localhost:5173`

---

## 📂 Project Structure

```
student-management-system/
├── backend/
│   ├── data/
│   │   └── students.json       # Local persistent database (pre-seeded)
│   ├── .env                    # Backend environment config
│   ├── .env.example
│   ├── package.json
│   └── server.js               # Express API + MongoDB/Local auto-fallback
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.jsx   # Metrics & recent students
│   │   │   ├── Navbar.jsx      # Navigation bar
│   │   │   ├── StudentForm.jsx # Add & Edit student form
│   │   │   └── StudentList.jsx # Student records table with search & actions
│   │   ├── App.jsx             # Main React application state & API calls
│   │   ├── App.css
│   │   └── main.jsx
│   ├── .env                    # Frontend environment config
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── package.json                # Root launcher scripts
├── start-all.js                # Simultaneous backend + frontend launcher
├── start.bat                   # 1-click Windows runner
├── .gitignore
└── README.md
```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Health check & API status |
| `GET` | `/api/students` | Get all students (sorted by name) |
| `GET` | `/api/students/:id` | Get details of a single student |
| `POST` | `/api/students` | Add a new student |
| `PUT` | `/api/students/:id` | Update an existing student |
| `DELETE` | `/api/students/:id` | Delete a student |

### Student Record Fields
- `name` (String, required)
- `rollNumber` (String, unique, required)
- `email` (String, valid email format, required)
- `department` (String, required)
- `year` (Number 1–4, required)
- `phone` (String, 10 digits, required)
