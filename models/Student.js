const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    rollNo: {
        type: String,
        unique: true,
        trim: true
    },
    caste: {
        type: String,
        trim: true
    },
    community: {
        type: String,
        trim: true
    },
    classBranchSection: {
        type: String,
        trim: true
    },
    yearOfStudy: {
        type: String,
        trim: true
    },
    fatherName: {
        type: String,
        trim: true
    },
    fatherOccupation: {
        type: String,
        trim: true
    },
    fatherIncome: {
        type: String,
        trim: true
    },
    fatherMobile: {
        type: String,
        trim: true
    },
    motherName: {
        type: String,
        trim: true
    },
    motherOccupation: {
        type: String,
        trim: true
    },
    motherIncome: {
        type: String,
        trim: true
    },
    motherMobile: {
        type: String,
        trim: true
    },
    residentialAddress1: {
        type: String,
        trim: true
    },
    residentialAddress2: {
        type: String,
        trim: true
    },
    residentialAddress3: {
        type: String,
        trim: true
    },
    residentialCity: {
        type: String,
        trim: true
    },
    residentialState: {
        type: String,
        trim: true
    },
    residentialPincode: {
        type: String,
        trim: true
    },
    localGuardianName: {
        type: String,
        trim: true
    },
    localGuardianAddress1: {
        type: String,
        trim: true
    },
    localGuardianAddress2: {
        type: String,
        trim: true
    },
    localGuardianAddress3: {
        type: String,
        trim: true
    },
    localGuardianCity: {
        type: String,
        trim: true
    },
    localGuardianState: {
        type: String,
        trim: true
    },
    localGuardianPincode: {
        type: String,
        trim: true
    },
    localGuardianMobile: {
        type: String,
        trim: true
    },
    siblings: {
        type: String,
        trim: true
    },
    studentEmail: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    studentMobile: {
        type: String,
        trim: true
    },
    religion: {
        type: String,
        trim: true
    },
    bloodGroup: {
        type: String,
        trim: true
    },
    allergies: {
        type: String,
        trim: true
    },
    healthProblems: {
        type: String,
        trim: true
    },
    inHostel: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Student', studentSchema);

