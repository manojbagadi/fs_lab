const express = require('express');
const router = express.Router();

let courses = [
    { id: 1, title: 'Full Stack Web Development', code: 'CS3101', credits: 4 },
    { id: 2, title: 'Database Management Systems', code: 'CS3102', credits: 3 }
];

router.get('/', (req, res) => res.json(courses));
router.post('/', (req, res) => {
    const newCourse = { id: courses.length + 1, ...req.body };
    courses.push(newCourse);
    res.status(201).json(newCourse);
});

module.exports = router;
