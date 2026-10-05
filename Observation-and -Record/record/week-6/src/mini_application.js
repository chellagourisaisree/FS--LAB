const express = require('express');

const app = express();

app.use(express.json());

// Home route
app.get('/', (req, res) => {
    res.send("Welcome to Student Management Application");
});

// Get all students
app.get('/students', (req, res) => {
    const students = [
        {
            id: 1,
            name: "Gouri",
            branch: "CSE-AIML"
        },
        {
            id: 2,
            name: "Sai",
            branch: "CSE"
        }
    ];

    res.json(students);
});

// Get student by ID
app.get('/students/:id', (req, res) => {
    const id = req.params.id;

    res.send("Student ID: " + id);
});

// Add a student
app.post('/students', (req, res) => {
    const student = req.body;

    res.json({
        message: "Student added successfully",
        student: student
    });
});

// Start server
app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
