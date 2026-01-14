const express = require('express');
const LeavingForm = require('../models/LeavingForm');
const Student = require('../models/Student');
const router = express.Router();

// Submit hostel leaving form
router.post('/submit-leaving-form', async (req, res) => {
    try {
        const { studentId, studentName, parentMobile, reason, leavingTime, arrivalTime } = req.body;

        // Check if all fields are provided
        if (!studentId || !studentName || !parentMobile || !reason || !leavingTime || !arrivalTime) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        const newForm = new LeavingForm({
            studentId,
            studentName,
            parentMobile,
            reason,
            leavingTime,
            arrivalTime,
        });

        await newForm.save();
        res.status(201).json({ message: 'Leaving form submitted successfully!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all pending requests for admin dashboard
router.get('/pending-requests', async (req, res) => {
    try {
        const pendingRequests = await LeavingForm.find({ status: 'pending' });
        res.status(200).json(pendingRequests);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update the status of a leaving form (Admin only)
router.patch('/update-status/:id', async (req, res) => {
    try {
        const { status } = req.body; // 'accepted' or 'rejected'
        
        if (!['accepted', 'rejected'].includes(status)) {
            return res.status(400).json({ error: 'Status must be either accepted or rejected.' });
        }

        const updatedRequest = await LeavingForm.findByIdAndUpdate(req.params.id, { status }, { new: true });
        console.log(updatedRequest);
        if (!updatedRequest) {
            return res.status(404).json({ error: 'Request not found.' });
        }

        if (status === 'accepted') {
            const student = await Student.findByIdAndUpdate(
                updatedRequest.studentId,
                { inHostel: false }, // Set inHostel to false (absent)
                { new: true }
            );
            if (!student) {
                return res.status(404).json({ error: 'Student not found' });
            }
            console.log(`${updatedRequest.studentName} can leave the hostel.`);
            res.json({ message: 'Student can leave the hostel.' });
        } else {
            console.log(`${updatedRequest.studentName} cannot leave the hostel.`);
            res.json({ message: 'Student cannot leave the hostel.' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/hostel-absentees', async (req, res) => {
    try {
        const absentees = await Student.find({ inHostel: false });
        res.status(200).json(absentees);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.patch('/update-hostel-status/:studentId', async (req, res) => {
    try {
        const student = await Student.findById(req.params.studentId);
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }

        student.inHostel = true; // Student returns to the hostel
        await student.save();

        res.status(200).json({ message: 'Student status updated to true (returned to hostel)' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



module.exports = router;