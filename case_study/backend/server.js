/**
 * Student Records Management System - Express Backend
 * Course: Full-Stack Web Development (23CM4121) | Unit V Case Study
 * Student: B. Manoj | Roll No: A24126552072
 * Department: Computer Science & Engineering (AI & ML)
 * Institution: ANITS, Visakhapatnam
 *
 * This server implements solutions for:
 * 1. CORS - Cross-Origin Resource Sharing for Vercel Frontend
 * 2. Environment Variables - Safe configuration on Render
 * 3. Database Connectivity - Robust MongoDB Atlas connection
 * 4. API Endpoints - RESTful CRUD and Health-Check routes
 */

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Student = require("./models/Student");

const app = express();

// -----------------------------------------------------------------------------
// 1. MIDDLEWARE & CORS CONFIGURATION (Solution for CORS failure)
// -----------------------------------------------------------------------------
app.use(express.json());

// Get allowed origins from environment variable or default to localhost
const allowedOrigins = (process.env.FRONTEND_ORIGIN || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim().replace(/\/$/, ""));

// Configure CORS middleware with dynamic origin verification
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl, or Postman)
      if (!origin) return callback(null, true);

      // Check if incoming origin matches allowed list or Vercel preview domain
      const isAllowed =
        allowedOrigins.includes(origin) ||
        origin.endsWith(".vercel.app");

      if (isAllowed) {
        callback(null, true);
      } else {
        callback(new Error(`CORS Error: Origin ${origin} is not allowed`));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// -----------------------------------------------------------------------------
// 2. HEALTH CHECK ENDPOINT (Solution for Render Sleep / Cold Start)
// -----------------------------------------------------------------------------
// Vercel frontend pings this endpoint to check if Render server is awake
app.get("/api/health", (req, res) => {
  const dbStatus =
    mongoose.connection.readyState === 1 ? "connected" : "disconnected";

  res.status(200).json({
    status: "ok",
    message: "Student Records API is running smoothly",
    database: dbStatus,
    timestamp: new Date().toISOString(),
  });
});

// -----------------------------------------------------------------------------
// 3. STUDENT CRUD API ENDPOINTS
// -----------------------------------------------------------------------------

// (a) GET /api/students - Retrieve all student records
app.get("/api/students", async (req, res) => {
  try {
    const students = await Student.find().sort({ rollNumber: 1 });
    res.status(200).json(students);
  } catch (error) {
    console.error("Error retrieving students:", error.message);
    res.status(500).json({ message: "Unable to retrieve student records" });
  }
});

// (b) GET /api/students/:id - Retrieve single student record by ID
app.get("/api/students/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(400).json({ message: "Invalid student ID format" });
  }
});

// (c) POST /api/students - Insert a new student record
app.post("/api/students", async (req, res) => {
  try {
    const { rollNumber, name, department, year, email, phone, attendance, cgpa } = req.body;

    // Check if roll number already exists
    const existing = await Student.findOne({ rollNumber: rollNumber.toUpperCase() });
    if (existing) {
      return res.status(400).json({ message: "Roll number already exists" });
    }

    const newStudent = await Student.create({
      rollNumber,
      name,
      department,
      year: year || "3rd Year",
      email,
      phone: phone || "N/A",
      attendance: attendance !== undefined ? Number(attendance) : 85,
      cgpa: cgpa !== undefined ? Number(cgpa) : 8.5,
    });

    res.status(201).json(newStudent);
  } catch (error) {
    console.error("Error creating student:", error.message);
    res.status(400).json({ message: error.message });
  }
});

// (d) PUT /api/students/:id - Update student record
app.put("/api/students/:id", async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student record not found" });
    }

    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// (e) DELETE /api/students/:id - Delete a student record
app.delete("/api/students/:id", async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    if (!deletedStudent) {
      return res.status(404).json({ message: "Student record not found" });
    }
    res.status(200).json({ message: "Student record deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// (f) GET /api/reports/department-summary - MongoDB Aggregation Pipeline
app.get("/api/reports/department-summary", async (req, res) => {
  try {
    const summary = await Student.aggregate([
      {
        $group: {
          _id: "$department",
          totalStudents: { $sum: 1 },
          averageAttendance: { $avg: "$attendance" },
          averageCgpa: { $avg: "$cgpa" },
        },
      },
      { $sort: { totalStudents: -1 } },
    ]);
    res.status(200).json(summary);
  } catch (error) {
    res.status(500).json({ message: "Unable to generate department summary" });
  }
});

// -----------------------------------------------------------------------------
// 4. DATABASE CONNECTIVITY & SERVER START (Solution for Database Connectivity)
// -----------------------------------------------------------------------------
const PORT = process.env.PORT || 5000;
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/college_db";
const DB_NAME = process.env.DB_NAME || "college_db";

async function startServer() {
  try {
    console.log("Connecting to MongoDB database...");
    await mongoose.connect(MONGODB_URI, {
      dbName: DB_NAME,
    });
    console.log(`Connected to MongoDB Atlas: database '${DB_NAME}'`);

    app.listen(PORT, () => {
      console.log(`Express server running on port ${PORT}`);
      console.log(`Allowed Origins: ${allowedOrigins.join(", ")}`);
    });
  } catch (error) {
    console.error("Database connection failed:", error.message);
    console.error(
      "Hint: Verify MongoDB Atlas IP Access List (Whitelist 0.0.0.0/0 for Render)."
    );
    // Graceful startup even if DB is delayed
    app.listen(PORT, () => {
      console.log(`Express server running with DB in reconnect mode on port ${PORT}`);
    });
  }
}

startServer();

