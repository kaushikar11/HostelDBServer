require('dotenv').config();
const express = require('express');
const StudentModel = require('../models/Student');
const router = express.Router();

// Get all students
router.get('/read', async (req, res) => {
    try {
        const students = await StudentModel.find({}).sort({ createdAt: -1 });
        res.status(200).json(students);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Add new student
router.post('/add-student', async (req, res) => {
    try {
        const student = new StudentModel(req.body);
        await student.save();
        res.status(201).json({ message: 'Student added successfully', student });
    } catch (err) {
        console.error('Error inserting data:', err);
        if (err.code === 11000) {
            return res.status(400).json({ error: 'Student with this email or roll number already exists' });
        }
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get student by ID
router.get('/student/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const student = await StudentModel.findById(id);
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.status(200).json(student);
    } catch (err) {
        console.error('Error fetching student:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update student by ID
router.put('/update-student/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const updatedStudent = await StudentModel.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!updatedStudent) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.status(200).json({ message: 'Student updated successfully', student: updatedStudent });
    } catch (err) {
        console.error('Error updating student:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete student by ID
router.delete('/delete-student/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedStudent = await StudentModel.findByIdAndDelete(id);
        if (!deletedStudent) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.status(200).json({ message: 'Student deleted successfully' });
    } catch (err) {
        console.error('Error deleting student:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;