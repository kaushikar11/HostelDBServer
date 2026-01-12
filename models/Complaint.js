const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
    studentName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum: ['pending', 'resolved'],
        default: 'pending'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Complaint', complaintSchema);

