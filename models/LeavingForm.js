const mongoose = require('mongoose');

const leavingFormSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
    },
    studentName: String,
    leavingTime: Date,
    arrivalTime: Date,
    reason: String,
    parentMobile: String,
    status: {
        type: String,
        default: 'pending', // Can be 'pending', 'approved', or 'denied'
    },
});

module.exports = mongoose.model('LeavingForm', leavingFormSchema);