import React, { useState, useEffect } from "react";
import "./App.css";

// Read API URL from environment variable (configured on Vercel)
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch student records from Express backend
  useEffect(() => {
    fetch(`${API_URL}/api/students`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setStudents(data);
        setError("");
        setLoading(false);
      })
      .catch((err) => {
        setError("Unable to retrieve records. Check CORS, API URL, or database connection.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="container">
      <h2>Student Records</h2>
      <p className="subtitle">Frontend on Vercel | Backend on Render</p>

      {loading && <p>Loading student records...</p>}
      {error && <p className="error-box">{error}</p>}

      {!loading && !error && (
        <table className="student-table">
          <thead>
            <tr>
              <th>Roll No</th>
              <th>Student Name</th>
              <th>Department</th>
            </tr>
          </thead>
          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan="3">No records found.</td>
              </tr>
            ) : (
              students.map((s) => (
                <tr key={s._id || s.rollNumber}>
                  <td>{s.rollNumber}</td>
                  <td>{s.name}</td>
                  <td>{s.department}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
