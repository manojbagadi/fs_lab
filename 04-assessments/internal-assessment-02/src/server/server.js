const express = require('express');
const app = express();
app.use(express.json());

app.get('/api/ia2', (req, res) => {
    res.json({
        assessment: "Internal Assessment 02",
        status: "Backend API Endpoint Verified and Active",
        topics: ["Express.js Routing", "MongoDB CRUD", "React Integration"]
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`IA2 Server running on port ${PORT}`));
