const express = require('express');
const app = express();
const PORT = 3000;

// Sample list of 5 students  
const students = [
  { id: 101, name: 'Alice', branch: 'CSE' },
  { id: 102, name: 'Bob', branch: 'ECE' },
  { id: 103, name: 'Charlie', branch: 'IT' },
  { id: 104, name: 'David', branch: 'AI&DS' },
  { id: 105, name: 'Emma', branch: 'CSE' }
];

// Route 1: Home page (/)
app.get('/', (req, res) => {
  res.send('<h1>Welcome to Student Server</h1><p>Visit <a href="/students">/students</a> or <a href="/about">/about</a></p>');
});

// Route 2: Students list (/students)
app.get('/students', (req, res) => {
  res.json(students);
});

// Route 3: About application (/about)
app.get('/about', (req, res) => {
  res.send('<h2>About Application</h2><p>This is a basic Express.js server providing student records via REST routes.</p>');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
