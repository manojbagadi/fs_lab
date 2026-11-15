# UNIT V – Full-Stack Web Development Case Study

**Institution:** Anil Neerukonda Institute of Technology & Sciences (ANITS), Visakhapatnam  
**Department:** Computer Science & Engineering (AI & ML)  
**Course Title:** Full-Stack Web Development  
**Course Code:** 23CM4121  
**Unit:** Unit V – MongoDB, Database Operations and Cloud Deployment  
**Student Name:** B. Manoj  
**Roll Number:** A24126552072  
**Academic Year / Semester:** 3rd Year – 1st Semester (2026–27)  
**Topic:** **Cloud Deployment Failure Analysis & Resolution (Vercel + Render + MongoDB Atlas)**  

---

## PART A. Comprehensive Question

### Case Study Problem Statement

> **"A React frontend deployed on Vercel is unable to retrieve student records from an Express.js backend deployed on Render. Analyse the possible causes and propose appropriate solutions involving API configuration, environment variables, CORS and database connectivity."**

### Background and Context

In modern web development, full-stack applications often adopt a distributed microservices or multi-cloud deployment model:
1. **Frontend:** React Single-Page Application (SPA) deployed on **Vercel** (`https://student-records-app.vercel.app`).
2. **Backend:** Node.js and Express.js REST API service deployed on **Render** (`https://student-records-api.onrender.com`).
3. **Database:** MongoDB Atlas cloud cluster storing student records in the `college_db` database and `students` collection.

When the frontend fails to retrieve student records from the backend (`GET /api/students`), the issue can stem from any of the four key layers: **CORS policy**, **API environment configuration**, **MongoDB network access rules**, or **Render container sleep states**.

### Academic & Technical Requirements

The application realizes the required solutions through a complete, database-driven **Student Records Management System**:
- Store detailed student records including roll number, full name, department, academic year, email, phone, attendance percentage, and CGPA.
- Create and manage a MongoDB database named `college_db` and `students` collection using an optimized document structure.
- Perform core CRUD operations: insert a student, display records, modify department/CGPA, and delete records.
- Write MongoDB shell queries and Node.js Mongoose operations for data access.
- Use MongoDB Aggregation Pipeline to generate department-wise enrollment counts, average attendance, and average CGPA.
- Create unique indexes on `rollNumber` and secondary indexes on `department` for fast lookup.
- Deploy the system across Vercel, Render, and MongoDB Atlas with verified solutions for CORS, environment variables, database whitelisting, and cold-start health checks.

---

## PART B. Worked Solution

### 1. Analyse the Requirements

| Requirement | Proposed Solution |
| :--- | :--- |
| **Student Identity** | A unique roll number (e.g., `A24126552072`) identifies each student uniquely. |
| **Student Details** | Roll number, name, department, academic year, email, phone, attendance, and CGPA are stored in each document. |
| **Data Storage** | MongoDB Atlas cloud database: `college_db`; collection: `students`. |
| **Application Operations** | React frontend sends HTTP requests to Express API; Express reads and writes documents via Mongoose ODM. |
| **Reporting & Analytics** | Aggregation pipeline calculates department-wise enrollment count, average attendance, and average CGPA. |
| **Performance & Indexing** | Unique index on `rollNumber` prevents duplicate entries; index on `department` speeds up filtering. |
| **CORS Configuration** | Dynamic Express `cors` middleware validates requests originating from the Vercel domain. |
| **Environment Variables** | `VITE_API_URL` set on Vercel; `MONGODB_URI`, `FRONTEND_ORIGIN`, and `PORT` set on Render. |
| **Server Cold Start** | `/api/health` endpoint allows the frontend to probe and wake sleeping Render instances gracefully. |
| **Cloud Deployment** | Vercel hosts the React UI; Render hosts the Express API; MongoDB Atlas hosts the database. |

---

### 2. Design the MongoDB Document

Each student is represented as one BSON document in the `students` collection:

```json
{
  "_id": "6730a1b2c3d4e5f6a1b2c3d1",
  "rollNumber": "A24126552072",
  "name": "B. Manoj",
  "department": "CSE (AI & ML)",
  "year": "3rd Year",
  "email": "manoj@example.com",
  "phone": "9876543210",
  "attendance": 92,
  "cgpa": 9.15,
  "createdAt": "2026-11-15T04:20:00.000Z",
  "updatedAt": "2026-11-15T04:20:00.000Z"
}
```

#### Field Design Table

| Field | Suggested Data Type | Purpose |
| :--- | :--- | :--- |
| `rollNumber` | String | Unique student roll number (e.g., `A24126552072`). |
| `name` | String | Student's full legal name. |
| `department` | String | Academic branch (e.g., `CSE (AI & ML)`, `CSE`, `AI & DS`, `IT`). |
| `year` | String | Academic year (1st, 2nd, 3rd, 4th Year). |
| `email` | String | Institutional email address. |
| `phone` | String | Contact telephone number. |
| `attendance` | Number | Overall attendance percentage (0 to 100). |
| `cgpa` | Number | Cumulative Grade Point Average (0.0 to 10.0 scale). |
| `_id` | ObjectId | Automatic 12-byte unique BSON identifier generated by MongoDB. |

---

### 3. Create the Database and Collection

In MongoDB Shell (`mongosh`) or Atlas Web Terminal:

```javascript
use college_db;

db.createCollection("students");

db.students.insertMany([
  {
    rollNumber: "A24126552072",
    name: "B. Manoj",
    department: "CSE (AI & ML)",
    year: "3rd Year",
    email: "manoj@example.com",
    phone: "9876543210",
    attendance: 92,
    cgpa: 9.15
  },
  {
    rollNumber: "A24126552086",
    name: "K. Vinay",
    department: "CSE (AI & ML)",
    year: "3rd Year",
    email: "vinay@example.com",
    phone: "9876543211",
    attendance: 88,
    cgpa: 8.80
  },
  {
    rollNumber: "A24126552098",
    name: "Mohammed Almas",
    department: "AI & DS",
    year: "3rd Year",
    email: "almas@example.com",
    phone: "9876543212",
    attendance: 84,
    cgpa: 8.45
  },
  {
    rollNumber: "A24126552105",
    name: "S. Priya",
    department: "IT",
    year: "2nd Year",
    email: "priya@example.com",
    phone: "9876543213",
    attendance: 85,
    cgpa: 8.60
  },
  {
    rollNumber: "A24126552044",
    name: "R. Sai Teja",
    department: "CSE",
    year: "3rd Year",
    email: "saiteja@example.com",
    phone: "9876543214",
    attendance: 86,
    cgpa: 8.70
  }
]);
```

---

### 4. Perform MongoDB CRUD Operations

| Operation | MongoDB Query | Purpose |
| :--- | :--- | :--- |
| **Create** | `db.students.insertOne({ rollNumber: "A24126552072", name: "B. Manoj", department: "CSE (AI & ML)", email: "manoj@example.com" })` | Inserts a new student record into the database. |
| **Read** | `db.students.find({ department: "CSE (AI & ML)" }).pretty()` | Retrieves all students enrolled in the specified department. |
| **Update** | `db.students.updateOne({ rollNumber: "A24126552072" }, { $set: { cgpa: 9.25, updatedAt: new Date() } })` | Modifies the student's CGPA and updates timestamp. |
| **Delete** | `db.students.deleteOne({ rollNumber: "TEST-ROLL-999" })` | Permanently deletes the matching test student record. |

#### Useful Additional Diagnostic Queries

```javascript
// 1. Display all student records sorted by roll number
db.students.find({}).sort({ rollNumber: 1 });

// 2. Filter students with attendance below mandatory threshold (75%)
db.students.find({ attendance: { $lt: 75 } });

// 3. Count total active students in database
db.students.countDocuments({});
```

---

### 5. Create Indexes

```javascript
// Unique index to prevent duplicate roll numbers
db.students.createIndex({ rollNumber: 1 }, { unique: true });

// Secondary index to accelerate department-based filtering
db.students.createIndex({ department: 1 });

// View all existing indexes on students collection
db.students.getIndexes();
```

---

### 6. Use Aggregation for Department-Wise Summary

The administration requires category-wise academic reporting to observe enrollment distribution and performance:

```javascript
db.students.aggregate([
  {
    $group: {
      _id: "$department",
      totalStudents: { $sum: 1 },
      avgAttendance: { $avg: "$attendance" },
      avgCgpa: { $avg: "$cgpa" }
    }
  },
  { $sort: { totalStudents: -1 } }
]);
```

#### Expected Aggregation Results Table

| Department | Total Students | Average Attendance | Average CGPA |
| :--- | :---: | :---: | :---: |
| **CSE (AI & ML)** | 2 | 90.0% | 8.98 |
| **AI & DS** | 1 | 84.0% | 8.45 |
| **IT** | 1 | 85.0% | 8.60 |
| **CSE** | 1 | 86.0% | 8.70 |

---

### 7. Develop the Express.js Backend

Initialize the backend project and install essential modules:

```bash
npm init -y
npm install express mongoose cors dotenv
```

#### API Endpoint Summary Table

| Method | Endpoint | Action Performed |
| :--- | :--- | :--- |
| **GET** | `/api/health` | Diagnostic route to test server uptime and database connectivity. |
| **GET** | `/api/students` | Retrieves all student records sorted by roll number. |
| **POST** | `/api/students` | Inserts a new student document into MongoDB. |
| **PUT** | `/api/students/:id` | Updates an existing student record by ID. |
| **DELETE** | `/api/students/:id` | Deletes a student record permanently by ID. |
| **GET** | `/api/reports/department-summary` | Computes aggregation analytics grouped by department. |

---

### 8. Develop the React Frontend

Create the Vite React client application:

```bash
npm create vite@latest frontend -- --template react
cd frontend
npm install
npm run dev
```

Configure the production backend URL in `frontend/.env`:

```env
VITE_API_URL=https://student-records-api.onrender.com
```

---

### 9. Run and Test the Application Locally

1. Start MongoDB locally or configure `MONGODB_URI` in `backend/.env`.
2. From the `backend` folder, run `npm install` followed by `node server.js`.
3. From the `frontend` folder, run `npm install` followed by `npm run dev`. Open `http://localhost:5173`.
4. Verify that student records load automatically.
5. Add a student record using the modal form. Confirm it appears in the table and database.
6. Test edit and delete operations to verify data persistence.
7. Open `/api/health` in your browser to verify the health check response.

#### Test Cases Table

| Test Case | Action | Expected Result |
| :--- | :--- | :--- |
| **TC1: Health Check** | Send GET request to `/api/health`. | HTTP 200 OK with `status: "ok"` and `database: "connected"`. |
| **TC2: Read Records** | Load frontend dashboard. | Student records table renders all documents retrieved from backend. |
| **TC3: Create Student** | Submit form with student details. | HTTP 201 Created; student record stored in MongoDB. |
| **TC4: Update Student** | Update department or CGPA. | HTTP 200 OK; modified details reflected upon refresh. |
| **TC5: Delete Student** | Confirm deletion of student record. | HTTP 200 OK; document removed from MongoDB collection. |
| **TC6: Aggregation** | Request department summary report. | Aggregated student counts and averages returned category-wise. |

---

### 10. Deploy the Application Using Cloud Platforms

#### Deployment Architecture

| Layer | Platform | Responsibility |
| :--- | :--- | :--- |
| **Frontend UI** | Vercel | Hosts the built React application and provides public web access. |
| **Backend API** | Render | Runs the Express.js server in a continuous cloud Node container. |
| **Database** | MongoDB Atlas | Hosts the cloud database cluster and stores student BSON documents. |

#### Cloud Environment Variables Summary

| Variable | Where to Set It | Example / Purpose |
| :--- | :--- | :--- |
| `MONGODB_URI` | Render Backend Service | `mongodb+srv://user:pass@cluster0.mongodb.net/` (Atlas connection string) |
| `DB_NAME` | Render Backend Service | `college_db` (Active database name) |
| `FRONTEND_ORIGIN` | Render Backend Service | `https://student-records-app.vercel.app` (CORS whitelist) |
| `PORT` | Render Backend Service | `5000` (Port exposed by Render web container) |
| `VITE_API_URL` | Vercel Frontend Project | `https://student-records-api.onrender.com` (Target API base URL) |

---

### 11. In-Depth Root-Cause Analysis & Solutions

The case study question requires a detailed analysis of why a React frontend on Vercel cannot retrieve student records from an Express backend on Render. Here is the structured breakdown of the 4 causes and solutions:

#### Cause 1: CORS (Cross-Origin Resource Sharing) Mismatch
* **Possible Cause:** The Vercel app (`https://student-records-app.vercel.app`) and the Render API (`https://student-records-api.onrender.com`) are on different domains. Browsers block cross-origin requests by default unless the backend explicitly responds with matching `Access-Control-Allow-Origin` headers. If Express does not configure CORS or only allows `localhost`, the browser blocks the fetch.
* **Proposed Solution:** Use the `cors` package in `server.js` with dynamic origin verification. Read `FRONTEND_ORIGIN` from environment variables, allow `*.vercel.app` domains, and ensure HTTP `OPTIONS` preflight requests return HTTP 200.

#### Cause 2: Environment Variables & API Configuration
* **Possible Cause:** During development, API calls target `http://localhost:5000`. If this URL is hardcoded, the deployed Vercel frontend attempts to contact the user's local machine instead of the cloud backend. Additionally, Vite requires client-side environment variables to strictly start with `VITE_` (e.g., `VITE_API_URL`). Without this prefix, the variable is undefined after build.
* **Proposed Solution:** In Vercel Project Settings, add `VITE_API_URL = https://student-records-api.onrender.com`. In `src/api.js`, read `import.meta.env.VITE_API_URL` dynamically with a safe fallback.

#### Cause 3: Database Connectivity (MongoDB Atlas Network Access)
* **Possible Cause:** Render's free tier uses dynamic, shared IP addresses that change on every deployment or restart. If MongoDB Atlas Network Access only whitelists the developer's home IP, Atlas rejects all incoming TCP connection requests from Render, causing database connection timeouts or uncaught exceptions.
* **Proposed Solution:** In MongoDB Atlas > Network Access, add IP entry `0.0.0.0/0` (Allow Access from Anywhere). Use a robust Mongoose connection handler with connection event logging.

#### Cause 4: Render Free-Tier Sleep Mode (Cold Start Latency)
* **Possible Cause:** Free Render web services automatically spin down after 15 minutes of inactivity. When a user first opens the Vercel frontend, the initial API request takes 50+ seconds while the container boots up, resulting in client-side network timeouts (`Failed to fetch`) or HTTP 504 Gateway Timeout.
* **Proposed Solution:** Implement a lightweight `/api/health` route. On the frontend, display a clear, friendly status banner indicating that the server is waking up, and provide an automated retry mechanism.

---

## PART C. Output Screen Shots (Test Case Results)

### Screen 1: Student Records Management Dashboard
Shows the production React frontend on Vercel displaying student statistics, active connectivity status pills (Vercel, Render, Atlas), search filtering, and the enrolled student directory with B. Manoj.

![Dashboard](./screenshots/01_dashboard.png)

---

### Screen 2: Backend API Health Check (`/api/health`)
Shows the successful HTTP 200 OK JSON response from the Render web service confirming active server status and live MongoDB Atlas database connection.

![Backend Health](./screenshots/02_backend_health.png)

---

### Screen 3: Student Records API Endpoint (`/api/students`)
Shows the JSON payload returned by `GET /api/students` containing all retrieved BSON student documents from `college_db.students`.

![API Students](./screenshots/03_api_students.png)

---

### Screen 4: MongoDB Atlas Cloud Data Explorer
Shows the MongoDB Atlas cloud console displaying database `college_db`, collection `students`, storage size, indexes, and documents for B. Manoj and classmates.

![MongoDB Atlas](./screenshots/04_mongodb_atlas.png)

---

### Screen 5: RESTful CRUD API Test Summary
Shows terminal execution of automated curl test commands verifying Health Check, Insert Student, Retrieve Records, Update Record, Delete Record, and Aggregation Summary.

![CRUD Tests](./screenshots/05_crud_test_summary.png)

---

### Screen 6: Multi-Cloud Production Deployment Evidence
Shows the Vercel Project Dashboard (Status: Ready) and Render Web Service Dashboard (Status: Live) confirming coordinated cloud deployment.

![Cloud Deployment](./screenshots/06_cloud_deployment.png)

---

## 12. Expected Final Outcome & Submission Checklist

- [x] **Public Frontend:** Accessible on Vercel (`https://student-records-app.vercel.app`).
- [x] **Public Backend API:** Live on Render (`https://student-records-api.onrender.com`).
- [x] **Cloud Database:** Hosted on MongoDB Atlas (`college_db.students`).
- [x] **Verified CRUD:** Create, Read, Update, Delete functioning without CORS or network errors.
- [x] **Diagnostic Endpoint:** `/api/health` providing live server and DB state.
- [x] **Root-Cause Analysis:** Comprehensive documentation of CORS, Environment Variables, Atlas Whitelist, and Cold Starts.
- [x] **PDF Documentation:** Ready-to-print `casestudy.pdf` matching institutional format.
