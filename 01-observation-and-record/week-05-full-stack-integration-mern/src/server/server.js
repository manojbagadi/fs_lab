const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/tasks', taskRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'MERN Integration Backend API Running' });
});

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mern_lab';
mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('MongoDB connected for MERN App');
        app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
    })
    .catch(err => console.error(err));
