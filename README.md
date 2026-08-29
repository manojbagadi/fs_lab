# Full Stack Web Development Laboratory (`fs_lab`)

Welcome to the **Full Stack Web Development Lab** repository. This repository adheres strictly to the standardized institutional course structure, containing weekly observations, laboratory records, topic-wise practice exercises, assignments, and internal assessment solutions.

---

## 📂 Repository Structure

```text
full-stack-web-development/
│
├── README.md
├── .gitignore
│
├── 01-observation-and-record/
│   ├── week-01-html5-and-css3/
│   │   ├── Observation_Week01.pdf
│   │   ├── Record_Week01.pdf
│   │   ├── screenshots/
│   │   │   ├── program1-form-output.png
│   │   │   └── program2-flexbox-output.png
│   │   └── src/
│   │       ├── index.html
│   │       ├── style.css
│   │       └── contact.html
│   │
│   ├── week-02-javascript-es6-and-dom/
│   │   ├── Observation_Week02.pdf
│   │   ├── Record_Week02.pdf
│   │   ├── screenshots/
│   │   │   ├── dom-manipulation-output.png
│   │   │   └── async-fetch-output.png
│   │   └── src/
│   │       ├── app.js
│   │       └── index.html
│   │
│   ├── week-03-node-and-express-js/
│   │   ├── Observation_Week03.pdf
│   │   ├── Record_Week03.pdf
│   │   ├── screenshots/
│   │   │   ├── express-server-terminal.png
│   │   │   └── postman-api-response.png
│   │   └── src/
│   │       ├── server.js
│   │       ├── package.json
│   │       └── routes/
│   │           └── api.js
│   │
│   ├── week-04-mongodb-and-mongoose/
│   │   ├── Observation_Week04.pdf
│   │   ├── Record_Week04.pdf
│   │   ├── screenshots/
│   │   │   ├── mongodb-compass-db.png
│   │   │   └── crud-operations-output.png
│   │   └── src/
│   │       ├── dbConfig.js
│   │       ├── models/
│   │       │   └── User.js
│   │       └── controllers/
│   │           └── userController.js
│   │
│   └── week-05-full-stack-integration-mern/
│       ├── Observation_Week05.pdf
│       ├── Record_Week05.pdf
│       ├── screenshots/
│       │   ├── frontend-ui-output.png
│       │   └── network-tab-api-call.png
│       └── src/
│           ├── client/         # React / Frontend App
│           └── server/         # Express & MongoDB Backend
│
├── 02-topic-wise-practice/
│   ├── 01-html-and-css/
│   │   ├── semantic-tags.html
│   │   ├── flexbox-grid-layout.css
│   │   └── responsive-navbar.html
│   │
│   ├── 02-javascript/
│   │   ├── array-methods-es6.js
│   │   ├── fetch-api-promises.js
│   │   └── event-listeners.js
│   │
│   ├── 03-node-and-express/
│   │   ├── basic-http-server.js
│   │   ├── express-middleware-demo.js
│   │   └── rest-api-crud.js
│   │
│   ├── 04-mongodb/
│   │   ├── mongoose-schema-validation.js
│   │   └── aggregation-queries.js
│   │
│   └── 05-frontend-frameworks/
│       ├── react-components-props/
│       │   └── CourseCard.jsx
│       └── state-management-hooks/
│           └── CounterHook.jsx
│
├── 03-assignments/
│   ├── assignment-01-responsive-portfolio/
│   │   ├── Problem_Statement.pdf
│   │   ├── screenshots/
│   │   │   ├── desktop-view.png
│   │   │   └── mobile-view.png
│   │   └── src/
│   │       ├── index.html
│   │       └── style.css
│   │
│   └── assignment-02-restful-api-service/
│       ├── Problem_Statement.pdf
│       ├── screenshots/
│       │   └── postman-tests.png
│       └── src/
│           ├── package.json
│           ├── server.js
│           └── routes/
│               └── courses.js
│
└── 04-assessments/
    ├── internal-assessment-01/
    │   ├── QuestionPaper_IA1.pdf
    │   ├── screenshots/
    │   │   └── exam-output-proof.png
    │   └── src/
    │       ├── index.html
    │       ├── style.css
    │       └── script.js
    │
    └── internal-assessment-02/
        ├── QuestionPaper_IA2.pdf
        ├── screenshots/
        │   └── fullstack-app-demo.png
        └── src/
            ├── client/
            │   └── App.js
            └── server/
                └── server.js
```

---

## 🛠️ Technology Stack

- **Frontend:** HTML5, CSS3, JavaScript (ES6+), React.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose ODM
- **Tools & Testing:** Postman, MongoDB Compass, Git, GitHub

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16+)
- [MongoDB](https://www.mongodb.com/) (Local Community Server or Atlas URI)
- Modern Web Browser (Google Chrome / Firefox)

### Running Week 03 (Node & Express Server)
```bash
cd 01-observation-and-record/week-03-node-and-express-js/src
npm install
npm run dev
```

### Running Week 04 (MongoDB & Mongoose)
```bash
cd 01-observation-and-record/week-04-mongodb-and-mongoose/src
npm install
npm start
```

### Running Week 05 (Full Stack MERN)
```bash
# Start Backend
cd 01-observation-and-record/week-05-full-stack-integration-mern/src/server
npm install
npm run dev

# Start Frontend
cd ../client
npm install
npm start
```

---

## 👤 Author Information

- **Student Name:** Manoj Bagadi
- **Repository:** [manojbagadi/fs_lab](https://github.com/manojbagadi/fs_lab)
- **Course:** Full Stack Web Development Laboratory
- **Institution:** Anil Neerukonda Institute of Technology & Sciences (ANITS)
