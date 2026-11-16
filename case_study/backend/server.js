require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Student = require("./models/Student");

const app = express();
app.use(express.json());

// 1. Solution for CORS: Allow requests from the deployed Vercel frontend
const allowedOrigin = process.env.FRONTEND_URL || "http://localhost:5173";
app.use(
  cors({
    origin: allowedOrigin,
    credentials: true
  })
);

// 2. Solution for Database Connectivity: Connect to MongoDB Atlas
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/college_db";
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.log("Database connection error:", err.message));

// 3. Solution for API Configuration: Health-check route
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Backend is running on Render" });
});

// 4. API Route: Retrieve all student records
app.get("/api/students", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: "Unable to retrieve student records" });
  }
});

// 5. Solution for Environment Variables: Render provides PORT dynamically
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
