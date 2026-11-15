/**
 * API Service Module
 * Handles HTTP communication between Vercel Frontend and Render Backend
 *
 * Solution for API Configuration & CORS issues:
 * 1. Reads dynamic VITE_API_URL set in Vercel environment dashboard.
 * 2. Defaults safely to localhost for development.
 * 3. Provides clean error diagnosis for CORS or Render wake-up timeouts.
 */

const RAW_API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
export const API_BASE_URL = RAW_API_URL.replace(/\/$/, "");
export const API_ENDPOINT = `${API_BASE_URL}/api`;

// Helper function to handle fetch responses with meaningful error messages
async function handleResponse(response) {
  if (!response.ok) {
    let errorMessage = `HTTP Error ${response.status}: ${response.statusText}`;
    try {
      const data = await response.json();
      if (data && data.message) {
        errorMessage = data.message;
      }
    } catch {
      // response was not JSON
    }
    throw new Error(errorMessage);
  }
  return response.json();
}

// 1. Health check (tests connection to Render and MongoDB)
export async function getHealthStatus() {
  try {
    const response = await fetch(`${API_ENDPOINT}/health`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    return await handleResponse(response);
  } catch (error) {
    if (error.name === "TypeError" && error.message.includes("Failed to fetch")) {
      throw new Error(
        "Render backend is unreachable. It might be waking up from sleep (cold start) or blocked by CORS."
      );
    }
    throw error;
  }
}

// 2. Retrieve all student records
export async function getStudents() {
  try {
    const response = await fetch(`${API_ENDPOINT}/students`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    return await handleResponse(response);
  } catch (error) {
    if (error.name === "TypeError" && error.message.includes("Failed to fetch")) {
      throw new Error(
        "Unable to retrieve records. Check if Render backend is awake and CORS allows this Vercel origin."
      );
    }
    throw error;
  }
}

// 3. Add a new student record
export async function addStudent(studentData) {
  const response = await fetch(`${API_ENDPOINT}/students`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(studentData),
  });
  return await handleResponse(response);
}

// 4. Update an existing student record
export async function updateStudent(id, studentData) {
  const response = await fetch(`${API_ENDPOINT}/students/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(studentData),
  });
  return await handleResponse(response);
}

// 5. Delete a student record
export async function deleteStudent(id) {
  const response = await fetch(`${API_ENDPOINT}/students/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  return await handleResponse(response);
}

// 6. Get department summary aggregation report
export async function getDepartmentSummary() {
  const response = await fetch(`${API_ENDPOINT}/reports/department-summary`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return await handleResponse(response);
}
