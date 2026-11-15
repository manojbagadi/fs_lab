import React, { useState, useEffect } from "react";
import {
  getHealthStatus,
  getStudents,
  addStudent,
  updateStudent,
  deleteStudent,
  API_ENDPOINT,
} from "./api";
import "./App.css";

const initialForm = {
  rollNumber: "",
  name: "",
  department: "CSE (AI & ML)",
  year: "3rd Year",
  email: "",
  phone: "",
  attendance: "85",
  cgpa: "8.5",
};

export default function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [backendStatus, setBackendStatus] = useState("Checking...");
  const [databaseStatus, setDatabaseStatus] = useState("Checking...");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDept, setSelectedDept] = useState("All");

  // Form state
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Load health and student data on startup
  useEffect(() => {
    checkHealthAndLoadData();
  }, []);

  async function checkHealthAndLoadData() {
    setLoading(true);
    setErrorMessage("");
    try {
      // 1. Check Backend Health
      const health = await getHealthStatus();
      setBackendStatus(health.status === "ok" ? "Online" : "Unknown");
      setDatabaseStatus(health.database === "connected" ? "Connected" : "Disconnected");

      // 2. Fetch Student Records
      const data = await getStudents();
      setStudents(data);
    } catch (err) {
      console.error("Connection error:", err);
      setBackendStatus("Offline / Sleeping");
      setDatabaseStatus("Unreachable");
      setErrorMessage(err.message || "Failed to retrieve student records from Render backend.");
    } finally {
      setLoading(false);
    }
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function openAddModal() {
    setEditingId(null);
    setForm(initialForm);
    setShowModal(true);
    setErrorMessage("");
    setSuccessMessage("");
  }

  function openEditModal(student) {
    setEditingId(student._id);
    setForm({
      rollNumber: student.rollNumber,
      name: student.name,
      department: student.department,
      year: student.year,
      email: student.email,
      phone: student.phone || "",
      attendance: student.attendance !== undefined ? String(student.attendance) : "85",
      cgpa: student.cgpa !== undefined ? String(student.cgpa) : "8.5",
    });
    setShowModal(true);
    setErrorMessage("");
    setSuccessMessage("");
  }

  function closeModal() {
    setShowModal(false);
    setEditingId(null);
    setForm(initialForm);
  }

  async function handleFormSubmit(e) {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try {
      if (editingId) {
        await updateStudent(editingId, form);
        setSuccessMessage("Student record updated successfully!");
      } else {
        await addStudent(form);
        setSuccessMessage("New student record created successfully!");
      }
      closeModal();
      await checkHealthAndLoadData();
    } catch (err) {
      setErrorMessage(err.message || "Failed to save student record.");
    }
  }

  async function handleDelete(id, rollNumber) {
    if (!window.confirm(`Are you sure you want to delete student ${rollNumber}?`)) {
      return;
    }
    try {
      await deleteStudent(id);
      setSuccessMessage(`Student ${rollNumber} deleted successfully.`);
      await checkHealthAndLoadData();
    } catch (err) {
      setErrorMessage(err.message || "Failed to delete student record.");
    }
  }

  // Filter students based on search and department
  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.rollNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = selectedDept === "All" || s.department === selectedDept;
    return matchesSearch && matchesDept;
  });

  // Calculate quick statistics
  const totalStudents = students.length;
  const uniqueDepts = new Set(students.map((s) => s.department)).size;
  const avgAttendance = totalStudents
    ? (students.reduce((sum, s) => sum + (s.attendance || 0), 0) / totalStudents).toFixed(1)
    : "0";
  const avgCgpa = totalStudents
    ? (students.reduce((sum, s) => sum + (s.cgpa || 0), 0) / totalStudents).toFixed(2)
    : "0.00";

  return (
    <div className="app-container">
      {/* Top Header */}
      <header className="app-header">
        <div className="header-brand">
          <div className="brand-logo">ANITS</div>
          <div>
            <h1>Student Records Management System</h1>
            <p className="subtitle">
              Full-Stack Web Development (23CM4121) | Unit V Case Study
            </p>
          </div>
        </div>
        <div className="student-badge">
          <span className="badge-name">B. Manoj</span>
          <span className="badge-roll">Roll No: A24126552072</span>
          <span className="badge-dept">CSE (AI & ML) • 3rd Year</span>
        </div>
      </header>

      {/* Deployment & Diagnostics Status Bar */}
      <section className="diagnostics-bar">
        <div className="diag-item">
          <span className="diag-label">Frontend (Vercel):</span>
          <span className="status-pill status-online">Active</span>
        </div>
        <div className="diag-item">
          <span className="diag-label">Backend (Render):</span>
          <span
            className={`status-pill ${
              backendStatus === "Online" ? "status-online" : "status-warning"
            }`}
          >
            {backendStatus}
          </span>
        </div>
        <div className="diag-item">
          <span className="diag-label">Database (MongoDB Atlas):</span>
          <span
            className={`status-pill ${
              databaseStatus === "Connected" ? "status-online" : "status-error"
            }`}
          >
            {databaseStatus}
          </span>
        </div>
        <div className="diag-item diag-endpoint">
          <span className="diag-label">Target API:</span>
          <code>{API_ENDPOINT}</code>
        </div>
        <button
          className="refresh-btn"
          onClick={checkHealthAndLoadData}
          title="Test connectivity and reload"
        >
          ↻ Refresh
        </button>
      </section>

      {/* Error / Diagnosis Notice Banner */}
      {errorMessage && (
        <div className="alert-banner alert-error">
          <div className="alert-title">⚠️ Connectivity / API Notice</div>
          <div className="alert-body">{errorMessage}</div>
          <div className="alert-tips">
            <strong>Troubleshooting Checklist:</strong>
            <ul>
              <li>
                <strong>Render Free Tier Cold Start:</strong> Render free servers sleep after 15 min of inactivity. First request takes ~50s to spin up.
              </li>
              <li>
                <strong>CORS Configuration:</strong> Ensure <code>FRONTEND_ORIGIN</code> on Render includes your Vercel URL.
              </li>
              <li>
                <strong>MongoDB Atlas IP Whitelist:</strong> Ensure <code>0.0.0.0/0</code> is added in Atlas Network Access.
              </li>
              <li>
                <strong>Vercel Environment Variable:</strong> Verify <code>VITE_API_URL</code> points to your Render web service.
              </li>
            </ul>
          </div>
          <button className="retry-btn" onClick={checkHealthAndLoadData}>
            Retry Connection Now
          </button>
        </div>
      )}

      {/* Success Notification Banner */}
      {successMessage && (
        <div className="alert-banner alert-success">
          ✓ {successMessage}
        </div>
      )}

      {/* Analytics Summary Cards */}
      <section className="stats-grid">
        <div className="stat-card">
          <div className="stat-title">Total Enrolled</div>
          <div className="stat-value">{totalStudents}</div>
          <div className="stat-desc">Active student records</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">Departments</div>
          <div className="stat-value">{uniqueDepts}</div>
          <div className="stat-desc">Academic disciplines</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">Avg Attendance</div>
          <div className="stat-value">{avgAttendance}%</div>
          <div className="stat-desc">Institutional average</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">Avg CGPA</div>
          <div className="stat-value">{avgCgpa}</div>
          <div className="stat-desc">Academic performance</div>
        </div>
      </section>

      {/* Student Directory Controls */}
      <section className="table-controls">
        <div className="search-filter-group">
          <input
            type="text"
            className="search-input"
            placeholder="Search by student name or roll number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            className="filter-select"
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
          >
            <option value="All">All Departments</option>
            <option value="CSE (AI & ML)">CSE (AI & ML)</option>
            <option value="CSE">CSE</option>
            <option value="AI & DS">AI & DS</option>
            <option value="IT">IT</option>
            <option value="ECE">ECE</option>
          </select>
        </div>
        <button className="add-student-btn" onClick={openAddModal}>
          + Add New Student
        </button>
      </section>

      {/* Student Records Table */}
      <main className="table-wrapper">
        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Retrieving student records from Render backend...</p>
          </div>
        ) : filteredStudents.length === 0 ? (
          <div className="empty-state">
            <p>No student records found matching the criteria.</p>
            <button className="add-student-btn" onClick={openAddModal}>
              + Insert First Record
            </button>
          </div>
        ) : (
          <table className="student-table">
            <thead>
              <tr>
                <th>Roll Number</th>
                <th>Student Name</th>
                <th>Department</th>
                <th>Year</th>
                <th>Email</th>
                <th>Attendance</th>
                <th>CGPA</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((s) => (
                <tr key={s._id}>
                  <td className="cell-roll">{s.rollNumber}</td>
                  <td className="cell-name">{s.name}</td>
                  <td>
                    <span className="dept-tag">{s.department}</span>
                  </td>
                  <td>{s.year}</td>
                  <td className="cell-email">{s.email}</td>
                  <td>
                    <span
                      className={`attendance-badge ${
                        (s.attendance || 0) >= 75 ? "att-good" : "att-low"
                      }`}
                    >
                      {s.attendance || 85}%
                    </span>
                  </td>
                  <td className="cell-cgpa">{s.cgpa || "8.5"}</td>
                  <td className="cell-actions">
                    <button
                      className="action-btn edit-btn"
                      onClick={() => openEditModal(s)}
                    >
                      Edit
                    </button>
                    <button
                      className="action-btn delete-btn"
                      onClick={() => handleDelete(s._id, s.rollNumber)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>

      {/* Add / Edit Student Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{editingId ? "Edit Student Record" : "Add New Student Record"}</h2>
              <button className="close-btn" onClick={closeModal}>
                ×
              </button>
            </div>
            <form onSubmit={handleFormSubmit} className="student-form">
              <div className="form-grid">
                <div className="form-group">
                  <label>Roll Number *</label>
                  <input
                    type="text"
                    name="rollNumber"
                    required
                    disabled={!!editingId}
                    placeholder="e.g. 23CM401"
                    value={form.rollNumber}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Student Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="e.g. Aditya Sharma"
                    value={form.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Department *</label>
                  <select
                    name="department"
                    value={form.department}
                    onChange={handleInputChange}
                  >
                    <option value="CSE (AI & ML)">CSE (AI & ML)</option>
                    <option value="CSE">CSE</option>
                    <option value="AI & DS">AI & DS</option>
                    <option value="IT">IT</option>
                    <option value="ECE">ECE</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Academic Year *</label>
                  <select
                    name="year"
                    value={form.year}
                    onChange={handleInputChange}
                  >
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="e.g. aditya@example.com"
                    value={form.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="text"
                    name="phone"
                    placeholder="e.g. 9876543210"
                    value={form.phone}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Attendance (%)</label>
                  <input
                    type="number"
                    name="attendance"
                    min="0"
                    max="100"
                    value={form.attendance}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>CGPA</label>
                  <input
                    type="number"
                    step="0.01"
                    name="cgpa"
                    min="0"
                    max="10"
                    value={form.cgpa}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button type="submit" className="save-btn">
                  {editingId ? "Update Student" : "Save Student"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="app-footer">
        <p>
          Student Records Management System • Anil Neerukonda Institute of Technology & Sciences (ANITS)
        </p>
        <p className="footer-sub">
          Deployed Frontend: Vercel | Deployed Backend: Render | Database: MongoDB Atlas
        </p>
      </footer>
    </div>
  );
}

