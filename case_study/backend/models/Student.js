const mongoose = require("mongoose");

// Student Schema Definition
const studentSchema = new mongoose.Schema(
  {
    rollNumber: {
      type: String,
      required: [true, "Roll number is required"],
      unique: true,
      trim: true,
      uppercase: true,
    },
    name: {
      type: String,
      required: [true, "Student name is required"],
      trim: true,
    },
    department: {
      type: String,
      required: [true, "Department is required"],
      trim: true,
    },
    year: {
      type: String,
      required: [true, "Academic year is required"],
      trim: true,
      default: "3rd Year",
    },
    email: {
      type: String,
      required: [true, "Email address is required"],
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      trim: true,
      default: "N/A",
    },
    attendance: {
      type: Number,
      min: 0,
      max: 100,
      default: 85,
    },
    cgpa: {
      type: Number,
      min: 0,
      max: 10,
      default: 8.5,
    },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt
  }
);

// Create indexes for efficient searching by roll number and department
studentSchema.index({ department: 1 });

module.exports = mongoose.model("Student", studentSchema);
