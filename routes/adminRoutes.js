const express = require('express');
const Student = require('../models/Student'); // Assuming you have a Student model
const router = express.Router();

// 1. Route to fetch all students with inHostel status as false (Hostel Absentees)
router.get('/hostel-absentees', async (req, res) => {
    try {
        // Fetch students who are currently marked as not in the hostel (inHostel: false)
        const absentees = await Student.find({ inHostel: false });

        // If no absentees found, return a message
        if (!absentees.length) {
            return res.status(404).json({ message: 'No absentees found.' });
        }

        // Send the list of absentees as a response
        res.status(200).json(absentees);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 2. Route to update student's hostel status to true (returned to hostel)
router.patch('/update-hostel-status/:studentId', async (req, res) => {
    try {
        const studentId = req.params.studentId;

        // Find the student by ID and update their inHostel status to true
        const updatedStudent = await Student.findByIdAndUpdate(studentId, { inHostel: true }, { new: true });

        // If student not found, return a 404 error
        if (!updatedStudent) {
            return res.status(404).json({ error: 'Student not found' });
        }

        // Return success message
        res.status(200).json({ message: 'Student status updated to true (returned to hostel)' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;