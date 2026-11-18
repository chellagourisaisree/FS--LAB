import { useState } from "react";

function StudentList({ students, onEdit, onDelete }) {
  const [search, setSearch] = useState("");

  // keep students whose name or roll number matches the search text
  const text = search.toLowerCase();
  const filtered = students.filter(
    (s) =>
      (s.name && s.name.toLowerCase().includes(text)) ||
      (s.rollNumber && s.rollNumber.toLowerCase().includes(text)) ||
      (s.department && s.department.toLowerCase().includes(text))
  );

  function handleDelete(student) {
    if (window.confirm("Are you sure you want to delete " + student.name + "?")) {
      onDelete(student._id);
    }
  }

  return (
    <div>
      <h2>All Students</h2>
      <input
        className="search"
        placeholder="Search by name, roll number, or department"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filtered.length === 0 ? (
        <p>No students found.</p>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Roll Number</th>
                <th>Email</th>
                <th>Department</th>
                <th>Year</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr key={s._id}>
                  <td>{s.name}</td>
                  <td>{s.rollNumber}</td>
                  <td>{s.email}</td>
                  <td>{s.department}</td>
                  <td>{s.year}</td>
                  <td>{s.phone}</td>
                  <td>
                    <button onClick={() => onEdit(s)}>Edit</button>
                    <button className="red" onClick={() => handleDelete(s)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default StudentList;
