const express = require('express');
const cors = require('cors');
const courseRoutes = require('./routes/courses');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/courses', courseRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Assignment 2 REST API on port ${PORT}`));
