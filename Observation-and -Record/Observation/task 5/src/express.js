
const express = require("express");

const app = express();

const PORT = 3000;

// Middleware
app.use(express.json());

// Student data
let students = [
    { id: 1, name: "Gouri", branch: "CSE-AIML", year: 3 },
    { id: 2, name: "Sai", branch: "CSE", year: 3 },
    { id: 3, name: "Sree", branch: "ECE", year: 2 },
    { id: 4, name: "Anu", branch: "CSE", year: 3 },
    { id: 5, name: "Ravi", branch: "IT", year: 2 }
];

// GET /
app.get("/", (req, res) => {
    res.send("Welcome to Student Management Server");
});

// GET /students
app.get("/students", (req, res) => {
    res.json(students);
});

// POST /students
app.post("/students", (req, res) => {
    const newStudent = {
        id: students.length + 1,
        name: req.body.name,
        branch: req.body.branch,
        year: req.body.year
    };

    students.push(newStudent);

    res.status(201).json({
        message: "Student added successfully",
        student: newStudent
    });
});

// PUT /students/:id
app.put("/students/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    student.name = req.body.name;
    student.branch = req.body.branch;
    student.year = req.body.year;

    res.json({
        message: "Student updated successfully",
        student: student
    });
});

// DELETE /students/:id
app.delete("/students/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const index = students.findIndex(s => s.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    const deletedStudent = students.splice(index, 1);

    res.json({
        message: "Student deleted successfully",
        student: deletedStudent[0]
    });
});

// GET /about
app.get("/about", (req, res) => {
    res.send("Student Management Application developed using Node.js and Express.js.");
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
```
