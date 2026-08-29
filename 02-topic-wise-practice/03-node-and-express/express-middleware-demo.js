const express = require('express');
const app = express();

// Custom Logger Middleware
const loggerMiddleware = (req, res, next) => {
    console.log(`[${req.method}] ${req.path} - ${new Date().toISOString()}`);
    next();
};

// Auth Token Verification Middleware
const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ error: "Access Denied: Missing Authorization Header" });
    }
    next();
};

app.use(loggerMiddleware);

app.get('/public', (req, res) => {
    res.send("This is a public route accessible by anyone.");
});

app.get('/protected', authMiddleware, (req, res) => {
    res.send("Welcome to the protected route! Authenticated.");
});

app.listen(4000, () => console.log('Middleware demo server on port 4000'));
