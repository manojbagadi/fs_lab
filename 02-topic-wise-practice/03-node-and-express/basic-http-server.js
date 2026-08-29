const http = require('http');

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');
    if (req.url === '/' && req.method === 'GET') {
        res.writeHead(200);
        res.end(JSON.stringify({ message: "Welcome to Native Node.js HTTP Server" }));
    } else {
        res.writeHead(404);
        res.end(JSON.stringify({ error: "Route Not Found" }));
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`HTTP Server running on port ${PORT}`);
});
