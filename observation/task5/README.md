# Project-Based Learning (PBL) Solutions

This repository contains clean, minimal solutions for 4 Web Development & Node.js tasks.

---

## 📁 Repository Structure

```
pbl/
├── q1_calculator.html      # Q1: Interactive Product Calculator (HTML/CSS/JS)
├── q2_file_manager.js      # Q2: Node.js File Management (Built-in 'fs' module)
├── q3_student_server.js    # Q3: Express.js Student Server (REST API)
├── q4_dom_demo.html        # Q4: DOM Manipulation Demonstration
├── package.json            # Node.js dependencies
└── README.md               # Documentation and execution guide
```

---

## 🚀 Tasks & How to Run

### **Task 1: Interactive Product Calculator (`q1_calculator.html`)**
* **Concepts**: HTML5, CSS3, DOM Event Listeners (`input`), dynamic calculation without page reload.
* **How to Run**:
  - Open `q1_calculator.html` directly in any web browser.

---

### **Task 2: Node.js File Management (`q2_file_manager.js`)**
* **Concepts**: Node.js `fs` module (`writeFileSync`, `readFileSync`, `appendFileSync`), `readline/promises`.
* **How to Run**:
  ```bash
  node q2_file_manager.js
  ```
  - Enter a filename (e.g. `notes.txt`), initial content, and extra content to append when prompted.

---

### **Task 3: Express.js Student Server (`q3_student_server.js`)**
* **Concepts**: Express.js server, HTTP GET routing, JSON response handling.
* **How to Run**:
  ```bash
  npm install
  node q3_student_server.js
  ```
  - Open browser endpoints:
    - `http://localhost:3000/` (Home)
    - `http://localhost:3000/students` (List of 5 students)
    - `http://localhost:3000/about` (Application Info)

---

### **Task 4: Document Object Model (DOM) Demo (`q4_dom_demo.html`)**
* **Concepts**: Explanation of DOM, dynamic modification of Content (`innerHTML`), Style (`element.style`), and Attributes (`setAttribute`).
* **How to Run**:
  - Open `q4_dom_demo.html` directly in any web browser and click the interactive buttons.
