function Dashboard({ students, onNavigateAdd, onNavigateList }) {
  // show a small list of registered students (first 5)
  const recent = students.slice(0, 5);

  return (
    <div>
      <h1>Welcome to the Student Management System</h1>
      <p>Add, view, update, search, and delete student records with instant database persistence.</p>

      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "center" }}>
        <div className="card">
          <h3>Total Students</h3>
          <p className="big-number">{students.length}</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <button onClick={onNavigateAdd} style={{ padding: "10px 18px", fontSize: "14px" }}>
            + Add New Student
          </button>
          <button onClick={onNavigateList} className="grey" style={{ padding: "10px 18px", fontSize: "14px" }}>
            View Full Student List
          </button>
        </div>
      </div>

      <h3 style={{ marginTop: "24px" }}>Recent Students</h3>
      {recent.length === 0 ? (
        <p>No students registered yet. Click &quot;Add Student&quot; above to create the first record.</p>
      ) : (
        <ul style={{ paddingLeft: "20px" }}>
          {recent.map((s) => (
            <li key={s._id} style={{ margin: "8px 0" }}>
              <strong>{s.name}</strong> ({s.rollNumber}) &mdash; {s.department} (Year {s.year}) &mdash; {s.phone}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dashboard;
