function Navbar({ page, changePage }) {
  return (
    <nav className="navbar">
      <h2>Student Management System</h2>
      <div>
        <button className={page === "dashboard" ? "active" : ""} onClick={() => changePage("dashboard")}>
          Dashboard
        </button>
        <button className={page === "add" ? "active" : ""} onClick={() => changePage("add")}>
          Add Student
        </button>
        <button className={page === "students" ? "active" : ""} onClick={() => changePage("students")}>
          View Students
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
