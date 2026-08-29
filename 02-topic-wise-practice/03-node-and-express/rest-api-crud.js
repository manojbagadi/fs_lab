const express = require('express');
const app = express();
app.use(express.json());

let products = [
    { id: 1, name: "Laptop", price: 65000 },
    { id: 2, name: "Wireless Mouse", price: 1200 }
];

app.get('/api/products', (req, res) => res.json(products));

app.post('/api/products', (req, res) => {
    const item = { id: products.length + 1, ...req.body };
    products.push(item);
    res.status(201).json(item);
});

app.put('/api/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = products.findIndex(p => p.id === id);
    if (index === -1) return res.status(404).send('Product not found');
    products[index] = { ...products[index], ...req.body, id };
    res.json(products[index]);
});

app.delete('/api/products/:id', (req, res) => {
    products = products.filter(p => p.id !== parseInt(req.params.id));
    res.send('Product deleted');
});

app.listen(5000, () => console.log('REST API CRUD running on port 5000'));
