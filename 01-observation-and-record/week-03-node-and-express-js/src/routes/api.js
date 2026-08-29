const express = require('express');
const router = express.Router();

// In-Memory Database for demonstration
let students = [
    { id: 1, name: "Manoj Bagadi", rollNo: "322126510001", department: "CSM", cgpa: 9.1 },
    { id: 2, name: "Suresh Kumar", rollNo: "322126510002", department: "ECE", cgpa: 8.7 },
    { id: 3, name: "Rahul Varma", rollNo: "322126510003", department: "CSE", cgpa: 8.4 }
];

// GET All Students
router.get('/students', (req, res) => {
    res.status(200).json({ success: true, count: students.length, data: students });
});

// GET Single Student by ID
router.get('/students/:id', (req, res) => {
    const student = students.find(s => s.id === parseInt(req.params.id));
    if (!student) {
        return res.status(404).json({ success: false, message: 'Student not found' });
    }
    res.status(200).json({ success: true, data: student });
});

// POST Create Student
router.post('/students', (req, res) => {
    const { name, rollNo, department, cgpa } = req.body;
    if (!name || !rollNo || !department) {
        return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    const newStudent = {
        id: students.length > 0 ? students[students.length - 1].id + 1 : 1,
        name,
        rollNo,
        department,
        cgpa: Number(cgpa) || 0.0
    };

    students.push(newStudent);
    res.status(201).json({ success: true, message: 'Student created successfully', data: newStudent });
});

// PUT Update Student
router.put('/students/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = students.findIndex(s => s.id === id);

    if (index === -1) {
        return res.status(404).json({ success: false, message: 'Student not found' });
    }

    students[index] = { ...students[index], ...req.body, id };
    res.status(200).json({ success: true, message: 'Student updated successfully', data: students[index] });
});

// DELETE Student
router.delete('/students/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const exists = students.some(s => s.id === id);

    if (!exists) {
        return res.status(404).json({ success: false, message: 'Student not found' });
    }

    students = students.filter(s => s.id !== id);
    res.status(200).json({ success: true, message: 'Student deleted successfully' });
});

module.exports = router;
