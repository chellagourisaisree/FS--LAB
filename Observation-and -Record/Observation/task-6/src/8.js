
const express = require("express");

const app = express();

const PORT = 3000;


// ===============================
// Logging Middleware
// ===============================

app.use((req, res, next) => {

    const time = new Date().toLocaleString();

    console.log(
        `[${time}] ${req.method} ${req.url}`
    );

    next();
});


// ===============================
// Routes
// ===============================

// Home Route
app.get("/", (req, res) => {
    res.send("Welcome to Express.js Middleware Example");
});


// Students Route
app.get("/students", (req, res) => {
    res.json([
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
    ]);
});


// About Route
app.get("/about", (req, res) => {
    res.send("This application demonstrates Express.js middleware.");
});


// ===============================
// Start Server
// ===============================

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
```
