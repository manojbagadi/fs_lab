const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address']
    },
    department: {
        type: String,
        required: true,
        enum: ['CSE', 'CSM', 'CSD', 'ECE', 'EEE', 'IT', 'MECH', 'CIVIL']
    },
    role: {
        type: String,
        enum: ['student', 'faculty', 'admin'],
        default: 'student'
    },
    cgpa: {
        type: Number,
        min: 0,
        max: 10
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);
