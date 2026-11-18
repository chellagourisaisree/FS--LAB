import { useState } from "react";

function StudentForm({ student, onSave, onCancel }) {
  // if a student is passed, we are editing, so start with their details
  const [form, setForm] = useState({
    name: student ? student.name : "",
    rollNumber: student ? student.rollNumber : "",
    email: student ? student.email : "",
    department: student ? student.department : "",
    year: student ? String(student.year) : "",
    phone: student ? student.phone : "",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const name = form.name.trim();
    const rollNumber = form.rollNumber.trim();
    const email = form.email.trim();
    const department = form.department.trim();
    const year = Number(form.year);
    const phone = form.phone.trim();

    // basic validation
    if (!name || !rollNumber || !email || !department || !form.year || !phone) {
      setError("Please fill in all the fields");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (!/^\d{10}$/.test(phone)) {
      setError("Phone number must be exactly 10 digits");
      return;
    }
    if (isNaN(year) || year < 1 || year > 4) {
      setError("Please select a valid year (1 - 4)");
      return;
    }

    setError("");
    setIsSubmitting(true);
    try {
      await onSave({
        name,
        rollNumber,
        email,
        department,
        year,
        phone,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>{student ? "Edit Student" : "Add Student"}</h2>
      {error && <p className="message error">{error}</p>}

      <label>Student Name</label>
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="e.g. John Doe"
        disabled={isSubmitting}
      />

      <label>Roll Number</label>
      <input
        name="rollNumber"
        value={form.rollNumber}
        onChange={handleChange}
        placeholder="e.g. CS101"
        disabled={isSubmitting}
      />

      <label>Email</label>
      <input
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        placeholder="e.g. john@example.com"
        disabled={isSubmitting}
      />

      <label>Department</label>
      <input
        name="department"
        value={form.department}
        onChange={handleChange}
        placeholder="e.g. Computer Science"
        disabled={isSubmitting}
      />

      <label>Year</label>
      <select
        name="year"
        value={form.year}
        onChange={handleChange}
        disabled={isSubmitting}
      >
        <option value="">Select year</option>
        <option value="1">1st Year</option>
        <option value="2">2nd Year</option>
        <option value="3">3rd Year</option>
        <option value="4">4th Year</option>
      </select>

      <label>Phone Number</label>
      <input
        name="phone"
        value={form.phone}
        onChange={handleChange}
        placeholder="e.g. 9876543210 (10 digits)"
        maxLength="10"
        disabled={isSubmitting}
      />

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : student ? "Update Student" : "Add Student"}
      </button>
      {student && (
        <button type="button" className="grey" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </button>
      )}
    </form>
  );
}

export default StudentForm;
