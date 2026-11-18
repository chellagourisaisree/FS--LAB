import { useState, useEffect } from "react";
import Navbar from "./components/Navbar.jsx";
import Dashboard from "./components/Dashboard.jsx";
import StudentForm from "./components/StudentForm.jsx";
import StudentList from "./components/StudentList.jsx";

// Backend address: uses VITE_API_URL if configured, otherwise falls back to /api/students (handled by Vite proxy)
const API_BASE = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");
const API = API_BASE ? `${API_BASE}/api/students` : "/api/students";

function App() {
  const [page, setPage] = useState("dashboard"); // dashboard, add or students
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ text: "", type: "" });

  function showMessage(text, type) {
    setMessage({ text, type });
    if (type === "success") {
      setTimeout(() => {
        setMessage((current) => (current.text === text ? { text: "", type: "" } : current));
      }, 4000);
    }
  }

  // GET all students from the backend
  async function loadStudents() {
    try {
      const response = await fetch(API);
      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.message || "Failed to load students");
      }
      const data = await response.json();
      setStudents(data);
      setMessage({ text: "", type: "" });
    } catch (err) {
      showMessage("Could not connect to the backend server. Please verify the backend is running on port 5000.", "error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadStudents();
  }, []);

  // POST (add) or PUT (update) a student
  async function saveStudent(data) {
    const url = editingStudent ? `${API}/${editingStudent._id}` : API;
    const method = editingStudent ? "PUT" : "POST";
    try {
      const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) {
        showMessage(result.message || "Failed to save student", "error");
        return;
      }
      showMessage(editingStudent ? "Student updated successfully!" : "Student added successfully!", "success");
      setEditingStudent(null);
      await loadStudents();
      setPage("students");
    } catch (err) {
      showMessage("Could not connect to the backend server. Please check your network connection.", "error");
    }
  }

  // DELETE a student
  async function deleteStudent(id) {
    try {
      const response = await fetch(`${API}/${id}`, { method: "DELETE" });
      const result = await response.json();
      if (!response.ok) {
        showMessage(result.message || "Could not delete student", "error");
        return;
      }
      showMessage("Student deleted successfully!", "success");
      await loadStudents();
    } catch (err) {
      showMessage("Could not connect to the backend server.", "error");
    }
  }

  function startEdit(student) {
    setEditingStudent(student);
    setMessage({ text: "", type: "" });
    setPage("add");
  }

  function changePage(newPage) {
    setEditingStudent(null);
    setMessage({ text: "", type: "" });
    setPage(newPage);
  }

  return (
    <div>
      <Navbar page={page} changePage={changePage} />
      <div className="container">
        {message.text && <p className={"message " + message.type}>{message.text}</p>}
        {loading && <p>Loading student records...</p>}

        {!loading && page === "dashboard" && (
          <Dashboard students={students} onNavigateAdd={() => changePage("add")} onNavigateList={() => changePage("students")} />
        )}
        {!loading && page === "add" && (
          <StudentForm
            key={editingStudent ? editingStudent._id : "new"}
            student={editingStudent}
            onSave={saveStudent}
            onCancel={() => changePage("students")}
          />
        )}
        {!loading && page === "students" && (
          <StudentList students={students} onEdit={startEdit} onDelete={deleteStudent} />
        )}
      </div>
    </div>
  );
}

export default App;
