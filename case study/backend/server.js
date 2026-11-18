// Backend for the Student Management System (Express + MongoDB / Local Storage Fallback)
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
const PORT = process.env.PORT || 5000;

// Path to local JSON storage
const DATA_DIR = path.join(__dirname, "data");
const DATA_FILE = path.join(DATA_DIR, "students.json");

// Enable CORS for development and production
app.use(cors({
  origin: (origin, callback) => {
    // allow requests with no origin (like mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    // Allow localhost/127.0.0.1 on any port or specified FRONTEND_URL
    const isLocalhost = /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);
    if (isLocalhost || origin === process.env.FRONTEND_URL || process.env.NODE_ENV !== "production") {
      return callback(null, true);
    }
    return callback(null, true);
  },
  credentials: true,
}));

app.use(express.json());

// Initial sample data if no students exist
const INITIAL_STUDENTS = [
  {
    _id: "6601a1b2c3d4e5f678901234",
    name: "Aarav Sharma",
    rollNumber: "CS101",
    email: "aarav.sharma@example.com",
    department: "Computer Science",
    year: 3,
    phone: "9876543210"
  },
  {
    _id: "6601a1b2c3d4e5f678901235",
    name: "Diya Patel",
    rollNumber: "EC204",
    email: "diya.patel@example.com",
    department: "Electronics",
    year: 2,
    phone: "9812345678"
  },
  {
    _id: "6601a1b2c3d4e5f678901236",
    name: "Rohan Verma",
    rollNumber: "ME305",
    email: "rohan.verma@example.com",
    department: "Mechanical",
    year: 4,
    phone: "9765432109"
  }
];

// Helper to ensure data folder and file exist
function getLocalStudents() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, JSON.stringify(INITIAL_STUDENTS, null, 2), "utf-8");
      return [...INITIAL_STUDENTS];
    }
    const raw = fs.readFileSync(DATA_FILE, "utf-8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error("Error reading local data file:", err.message);
    return [];
  }
}

function saveLocalStudents(list) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(list, null, 2), "utf-8");
  } catch (err) {
    console.error("Error saving local data file:", err.message);
    throw new Error("Failed to save data locally");
  }
}

// Local collection adapter implementing MongoDB collection interface
const localCollection = {
  find() {
    return {
      sort(sortQuery = { name: 1 }) {
        return {
          toArray: async () => {
            const list = getLocalStudents();
            if (sortQuery && sortQuery.name) {
              const dir = sortQuery.name >= 0 ? 1 : -1;
              list.sort((a, b) => (a.name || "").localeCompare(b.name || "") * dir);
            }
            return list;
          }
        };
      }
    };
  },

  async findOne(query) {
    const list = getLocalStudents();
    const targetId = query._id ? query._id.toString() : null;
    return list.find(s => s._id.toString() === targetId) || null;
  },

  async insertOne(doc) {
    const list = getLocalStudents();
    // Check rollNumber uniqueness (case-insensitive)
    const exists = list.some(
      s => (s.rollNumber || "").toLowerCase() === (doc.rollNumber || "").toLowerCase()
    );
    if (exists) {
      const err = new Error("Roll number already exists");
      err.code = 11000;
      throw err;
    }
    const insertedId = new ObjectId().toString();
    const newDoc = { _id: insertedId, ...doc };
    list.push(newDoc);
    saveLocalStudents(list);
    return { insertedId };
  },

  async updateOne(query, update) {
    const list = getLocalStudents();
    const targetId = query._id ? query._id.toString() : null;
    const index = list.findIndex(s => s._id.toString() === targetId);
    if (index === -1) {
      return { matchedCount: 0, modifiedCount: 0 };
    }

    const fields = update.$set || update;
    if (fields.rollNumber) {
      const duplicate = list.some(
        s => s._id.toString() !== targetId &&
          (s.rollNumber || "").toLowerCase() === (fields.rollNumber || "").toLowerCase()
      );
      if (duplicate) {
        const err = new Error("Roll number already exists");
        err.code = 11000;
        throw err;
      }
    }

    list[index] = { ...list[index], ...fields, _id: list[index]._id };
    saveLocalStudents(list);
    return { matchedCount: 1, modifiedCount: 1 };
  },

  async deleteOne(query) {
    const list = getLocalStudents();
    const targetId = query._id ? query._id.toString() : null;
    const index = list.findIndex(s => s._id.toString() === targetId);
    if (index === -1) {
      return { deletedCount: 0 };
    }
    list.splice(index, 1);
    saveLocalStudents(list);
    return { deletedCount: 1 };
  },

  async createIndex() {
    return "rollNumber_1";
  }
};

let students = localCollection; // Default to local collection
let activeDatabase = "local-json";

// Validation helper
function validate(s) {
  if (!s || typeof s !== "object") return "Student data is required";
  const name = String(s.name || "").trim();
  const rollNumber = String(s.rollNumber || "").trim();
  const email = String(s.email || "").trim();
  const department = String(s.department || "").trim();
  const phone = String(s.phone || "").trim();
  const year = Number(s.year);

  if (!name || !rollNumber || !email || !department || !s.year || !phone) {
    return "All fields are required";
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) return "Enter a valid email";
  if (!/^\d{10}$/.test(phone)) return "Phone number must be 10 digits";
  if (isNaN(year) || year < 1 || year > 4) return "Year must be between 1 and 4";
  return null;
}

// Clean and pick allowed fields
function pickFields(s) {
  return {
    name: String(s.name).trim(),
    rollNumber: String(s.rollNumber).trim(),
    email: String(s.email).trim(),
    department: String(s.department).trim(),
    year: Number(s.year),
    phone: String(s.phone).trim(),
  };
}

// Health check / API overview
app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "Student Management System API is running",
    database: activeDatabase,
    endpoints: {
      getStudents: "GET /api/students",
      getStudent: "GET /api/students/:id",
      addStudent: "POST /api/students",
      updateStudent: "PUT /api/students/:id",
      deleteStudent: "DELETE /api/students/:id"
    }
  });
});

// GET all students
app.get("/api/students", async (req, res) => {
  try {
    const list = await students.find().sort({ name: 1 }).toArray();
    res.json(list);
  } catch (err) {
    console.error("GET /api/students error:", err);
    res.status(500).json({ message: "Could not get students" });
  }
});

// GET one student
app.get("/api/students/:id", async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid student id" });
    }
    const student = await students.findOne({
      _id: activeDatabase === "mongodb" ? new ObjectId(req.params.id) : req.params.id
    });
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (err) {
    console.error("GET /api/students/:id error:", err);
    res.status(500).json({ message: "Could not get student" });
  }
});

// POST add a student
app.post("/api/students", async (req, res) => {
  const error = validate(req.body);
  if (error) return res.status(400).json({ message: error });
  try {
    const student = pickFields(req.body);
    const result = await students.insertOne(student);
    res.status(201).json({ ...student, _id: result.insertedId });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: "Roll number already exists" });
    }
    console.error("POST /api/students error:", err);
    res.status(500).json({ message: "Could not add student" });
  }
});

// PUT update a student
app.put("/api/students/:id", async (req, res) => {
  const error = validate(req.body);
  if (error) return res.status(400).json({ message: error });
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid student id" });
  }
  try {
    const result = await students.updateOne(
      { _id: activeDatabase === "mongodb" ? new ObjectId(req.params.id) : req.params.id },
      { $set: pickFields(req.body) }
    );
    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json({ message: "Student updated" });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: "Roll number already exists" });
    }
    console.error("PUT /api/students/:id error:", err);
    res.status(500).json({ message: "Could not update student" });
  }
});

// DELETE a student
app.delete("/api/students/:id", async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid student id" });
  }
  try {
    const result = await students.deleteOne({
      _id: activeDatabase === "mongodb" ? new ObjectId(req.params.id) : req.params.id
    });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json({ message: "Student deleted" });
  } catch (err) {
    console.error("DELETE /api/students/:id error:", err);
    res.status(500).json({ message: "Could not delete student" });
  }
});

// Connect to database and start server
async function start() {
  const uri = process.env.MONGODB_URI;
  const isPlaceholder = !uri || uri.includes("<username>") || uri.includes("<cluster-url>") || uri.includes("<password>");

  if (!isPlaceholder) {
    try {
      console.log("Connecting to MongoDB Atlas...");
      const client = new MongoClient(uri, {
        serverSelectionTimeoutMS: 4000,
        connectTimeoutMS: 4000,
      });
      await client.connect();
      const db = client.db("studentManagementDB");
      students = db.collection("students");
      await students.createIndex({ rollNumber: 1 }, { unique: true });
      activeDatabase = "mongodb";
      console.log("Connected to MongoDB Atlas");
    } catch (err) {
      console.warn("MongoDB connection failed (" + err.message + ")");
      console.log("Using local JSON storage (data/students.json) so server runs without external dependency");
      students = localCollection;
      activeDatabase = "local-json";
    }
  } else {
    console.log("No remote MongoDB URI configured (or placeholder present).");
    console.log("Using local persistent storage (data/students.json).");
    students = localCollection;
    activeDatabase = "local-json";
  }

  // Initialize seed data if needed
  if (activeDatabase === "local-json") {
    getLocalStudents();
  }

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Active storage: ${activeDatabase === "mongodb" ? "MongoDB Atlas" : "Local JSON database"}`);
  });
}

start();
