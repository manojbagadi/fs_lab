const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    code: {
        type: String,
        required: [true, 'Course code is required'],
        unique: true,
        uppercase: true
    },
    title: {
        type: String,
        required: [true, 'Course title is required'],
        minlength: [3, 'Title must be at least 3 characters long']
    },
    credits: {
        type: Number,
        required: true,
        min: [1, 'Credits must be at least 1'],
        max: [5, 'Credits cannot exceed 5']
    },
    isActive: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('Course', courseSchema);
