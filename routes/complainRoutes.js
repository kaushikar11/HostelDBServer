const express = require('express');
const Complaint = require('../models/Complaint');
const router = express.Router();

// Submit complaint
router.post('/submit-complaint', async (req, res) => {
    try {
        const { studentName, email, description } = req.body;

        const newComplaint = new Complaint({
            studentName,
            email,
            description,
        });

        await newComplaint.save();
        res.status(201).json({ message: 'Complaint submitted successfully!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all complaints for admin dashboard
router.get('/complaints', async (req, res) => {
    try {
        const complaints = await Complaint.find({});
        res.status(200).json(complaints);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update complaint status (Admin only)
router.patch('/resolve-complaint/:id', async (req, res) => {
    try {
        const updatedComplaint = await Complaint.findByIdAndUpdate(req.params.id, { status: 'resolved' }, { new: true });

        if (!updatedComplaint) {
            return res.status(404).json({ message: 'Complaint not found' });
        }

        res.status(200).json({ message: 'Complaint resolved' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;