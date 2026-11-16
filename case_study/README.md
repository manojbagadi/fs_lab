# Full Stack Web Development Case Study

**Course:** Full-Stack Web Development (23CM4121) – Unit V  
**Student Name:** B. Manoj  
**Roll Number:** A24126552072  
**Department:** Computer Science & Engineering (AI & ML)  
**Institution:** Anil Neerukonda Institute of Technology & Sciences (ANITS)  

---

## Problem Statement

> **"A React frontend deployed on Vercel is unable to retrieve student records from an Express.js backend deployed on Render. Analyse the possible causes and propose appropriate solutions involving API configuration, environment variables, CORS and database connectivity."**

---

## Causes and Solutions Summary

| Cause | Problem Description | Solution |
| :--- | :--- | :--- |
| **1. CORS** | Browser blocks cross-origin requests from Vercel (`vercel.app`) to Render (`onrender.com`). | Add `cors` middleware in Express and set `origin: process.env.FRONTEND_URL`. |
| **2. Environment Variables** | Hardcoded `localhost:5000` does not work in production; Vite requires `VITE_` prefix. | Define `VITE_API_URL` in Vercel settings and `PORT`, `MONGO_URI` in Render. |
| **3. API Configuration** | Frontend fetch points to wrong URL or relative path instead of full backend URL. | Use `import.meta.env.VITE_API_URL` in React `fetch()` calls. |
| **4. Database Connectivity** | Render dynamic IPs are blocked by MongoDB Atlas network security rules. | Add `0.0.0.0/0` in MongoDB Atlas Network Access IP Whitelist. |

---

## How to Run Locally

### Backend (Express)
```bash
cd case_study/backend
npm install
node server.js
```
The server starts at `http://localhost:5000`.

### Frontend (React)
```bash
cd case_study/frontend
npm install
npm run dev
```
Open `http://localhost:5173` in your browser.

---

## Documentation
The complete case study report is available in **`casestudy.pdf`**.
