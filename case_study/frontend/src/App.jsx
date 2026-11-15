import React, { useState, useEffect } from "react";
import {
  getHealthStatus,
  getStudents,
  addStudent,
  updateStudent,
  deleteStudent,
} from "./api";
import "./App.css";

const initialForm = {
  rollNumber: "",
  name: "",
  department: "CSE (AI & ML)",
  year: "3rd Year",
  email: "",
};

export default function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isOnline, setIsOnline] = useState(false);

  // Form & modal state
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    try {
      const health = await getHealthStatus();
      setIsOnline(health.status === "ok");
      const data = await getStudents();
      setStudents(data);
      setIsError(false);
    } catch (err) {
      setIsOnline(false);
      setIsError(true);
      setMessage(err.message || "Unable to connect to backend server.");
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
  }

  function openEditModal(student) {
    setEditingId(student._id);
    setForm({
      rollNumber: student.rollNumber,
      name: student.name,
      department: student.department,
      year: student.year,
      email: student.email,
    });
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
    setEditingId(null);
    setForm(initialForm);
  }

  async function handleFormSubmit(e) {
    e.preventDefault();
    try {
      if (editingId) {
        await updateStudent(editingId, form);
        setMessage("Student record updated successfully.");
      } else {
        await addStudent(form);
        setMessage("Student record added successfully.");
      }
      setIsError(false);
      closeModal();
      await loadData();
    } catch (err) {
      setIsError(true);
      setMessage(err.message || "Operation failed.");
    }
  }

  async function handleDelete(id, roll) {
    if (!window.confirm(`Delete student record ${roll}?`)) return;
    try {
      await deleteStudent(id);
      setMessage(`Student record deleted.`);
      setIsError(false);
      await loadData();
    } catch (err) {
      setIsError(true);
      setMessage(err.message || "Failed to delete student record.");
    }
  }

  const totalStudents = students.length;
  const uniqueDepts = new Set(students.map((s) => s.department)).size;

  return (
    <div className="container">
      {/* Simple Clean Header */}
      <header className="header">
        <div>
          <h1>Student Management System</h1>
          <p className="subtitle">Manage enrolled students and academic records.</p>
        </div>
        <div className="header-status">
          <span className={`status-dot ${isOnline ? "online" : "offline"}`}>
            ● {isOnline ? "Backend Connected" : "Connecting..."}
          </span>
          <button className="btn btn-secondary" onClick={loadData}>
            ↻ Refresh
          </button>
        </div>
      </header>

      {/* Alert message */}
      {message && (
        <div className={`alert ${isError ? "alert-danger" : "alert-success"}`}>
          {message}
        </div>
      )}

      {/* Clean Metric Cards */}
      <section className="metrics-row">
        <div className="metric-box">
          <div className="metric-label">TOTAL STUDENTS</div>
          <div className="metric-value">{totalStudents}</div>
        </div>
        <div className="metric-box">
          <div className="metric-label">DEPARTMENTS</div>
          <div className="metric-value">{uniqueDepts || 4}</div>
        </div>
        <div className="metric-box">
          <div className="metric-label">STATUS</div>
          <div className="metric-value active-val">{isOnline ? "Active" : "Idle"}</div>
        </div>
      </section>

      {/* Directory Section with Add button */}
      <section className="table-header-row">
        <h2>Student Records</h2>
        <button className="btn btn-primary" onClick={openAddModal}>
          + Add Student
        </button>
      </section>

      {/* Simple Clean Student Table */}
      <div className="table-card">
        {loading ? (
          <div className="loading-state">Loading student records...</div>
        ) : students.length === 0 ? (
          <div className="empty-state">No student records found.</div>
        ) : (
          <table className="simple-table">
            <thead>
              <tr>
                <th>Roll No</th>
                <th>Student Name</th>
                <th>Department</th>
                <th>Year</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s._id}>
                  <td className="font-bold">{s.rollNumber}</td>
                  <td>{s.name}</td>
                  <td>{s.department}</td>
                  <td>{s.year}</td>
                  <td className="text-muted">{s.email}</td>
                  <td>
                    <button
                      className="btn-action btn-edit"
                      onClick={() => openEditModal(s)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn-action btn-delete"
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
      </div>

      {/* Add / Edit Modal */}
      {showModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <div className="modal-top">
              <h3>{editingId ? "Edit Student Record" : "Add Student Record"}</h3>
              <button className="btn-close" onClick={closeModal}>
                ×
              </button>
            </div>
            <form onSubmit={handleFormSubmit} className="modal-form">
              <label>
                Roll Number
                <input
                  type="text"
                  name="rollNumber"
                  required
                  disabled={!!editingId}
                  placeholder="e.g. 23CM401"
                  value={form.rollNumber}
                  onChange={handleInputChange}
                />
              </label>

              <label>
                Student Name
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Aditya"
                  value={form.name}
                  onChange={handleInputChange}
                />
              </label>

              <label>
                Department
                <select
                  name="department"
                  value={form.department}
                  onChange={handleInputChange}
                >
                  <option value="CSE (AI & ML)">CSE (AI & ML)</option>
                  <option value="CSE">CSE</option>
                  <option value="AI & DS">AI & DS</option>
                  <option value="IT">IT</option>
                </select>
              </label>

              <label>
                Year
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
              </label>

              <label>
                Email
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="e.g. student@example.com"
                  value={form.email}
                  onChange={handleInputChange}
                />
              </label>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingId ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
