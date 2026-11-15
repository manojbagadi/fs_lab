# Unit V – Full-Stack Web Development Case Study

**Institution:** Anil Neerukonda Institute of Technology & Sciences (ANITS), Visakhapatnam  
**Department:** Computer Science & Engineering (AI & ML)  
**Course Title:** Full-Stack Web Development (23CM4121)  
**Unit:** Unit V – MongoDB, Database Operations and Cloud Deployment  
**Student Name:** B. Manoj  
**Roll Number:** A24126552072  
**Academic Year / Semester:** 3rd Year – 1st Semester (2026–27)  
**Project Name:** **Student Records Management System (Cloud Deployment Failure Analysis)**  

---

## Assigned Problem Statement

> **"A React frontend deployed on Vercel is unable to retrieve student records from an Express.js backend deployed on Render. Analyse the possible causes and propose appropriate solutions involving API configuration, environment variables, CORS and database connectivity."**

---

## Repository Structure

```text
case_study/
├── casestudy.pdf                # Institutional Case Study Report (PDF Format)
├── casestudy.md                 # Complete Case Study Documentation (Markdown)
├── README.md                    # Case study overview and quick start guide
├── backend/                     # Express.js REST API + Mongoose ODM (Render)
│   ├── models/Student.js        # Mongoose Schema & validation
│   ├── server.js                # Express app with CORS & MongoDB Atlas connection
│   ├── package.json             # Backend dependencies & start scripts
│   ├── render.yaml              # Render Cloud Blueprint
│   └── .env.example             # Backend environment template
├── frontend/                    # React 18 + Vite client application (Vercel)
│   ├── src/
│   │   ├── api.js               # API service with dynamic VITE_API_URL
│   │   ├── App.jsx              # Student directory table & live status banner
│   │   ├── App.css              # Modern responsive styles
│   │   ├── main.jsx             # React entrypoint
│   │   └── style.css            # Base stylesheet
│   ├── index.html               # HTML5 entrypoint
│   ├── package.json             # Frontend dependencies & build scripts
│   ├── vercel.json              # Vercel SPA rewrite rules
│   ├── vite.config.js           # Vite build configuration
│   └── .env.example             # Frontend environment template
└── screenshots/                 # High-resolution execution evidence
    ├── 01_dashboard.png         # React Student Records Dashboard on Vercel
    ├── 02_backend_health.png    # Backend API Health Endpoint (/api/health)
    ├── 03_api_students.png      # Student Records JSON Response (/api/students)
    ├── 04_mongodb_atlas.png     # MongoDB Atlas Cloud Data Explorer
    ├── 05_crud_test_summary.png # REST API test execution in terminal
    └── 06_cloud_deployment.png  # Multi-cloud deployment status (Vercel & Render)
```

---

## Summary of the 4 Root Causes and Solutions

| # | Failure Domain | Root Cause | Proposed Solution |
|---|---|---|---|
| **1** | **CORS** | Browser blocks cross-origin requests because Vercel (`vercel.app`) and Render (`onrender.com`) have distinct domains. | Express `cors` middleware with dynamic origin filtering for `FRONTEND_ORIGIN` and `*.vercel.app`. |
| **2** | **Environment Variables** | Hardcoding `http://localhost:5000` causes production fetch to fail; Vite client variables must be prefixed with `VITE_`. | Set `VITE_API_URL` on Vercel; set `PORT`, `NODE_ENV`, and `MONGODB_URI` on Render. |
| **3** | **Database Connectivity** | Render free tier uses dynamic IP addresses, which are blocked if MongoDB Atlas only whitelists developer's home IP. | Whitelist `0.0.0.0/0` in MongoDB Atlas Network Access; use robust Mongoose connection event listeners. |
| **4** | **Render Cold Start** | Render free web services sleep after 15 min of inactivity; the initial request takes ~50 seconds and times out. | Implement `/api/health` endpoint; show waking-up status banner in React with automatic retry. |

---

## Quick Execution Guide

### 1. Run the Backend Locally
```bash
cd case_study/backend
npm install
node server.js
```

### 2. Run the Frontend Locally
```bash
cd case_study/frontend
npm install
npm run dev
```
Open `http://localhost:5173` in your browser.

---

## Documentation File

The full institutional documentation is available as:
* 📄 **[casestudy.pdf](./casestudy.pdf)**
* 📝 **[casestudy.md](./casestudy.md)**
