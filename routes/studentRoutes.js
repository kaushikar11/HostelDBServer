require('dotenv').config();
const express = require('express');
const StudentModel = require('../models/Student');
const router = express.Router();
const verifyToken = require('../util/verifyToken');
const JWT_SECRET = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');

// Get all students
router.get('/read', async (req, res) => {
    try {
        const students = await StudentModel.find({});
        res.status(200).json(students);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
});
router.post('/get-student-id', async (req, res) => {
    const { email } = req.body;

    try {
        // Find the student in the database using email
        console.log(email);
        const student = await StudentModel.findOne({ studentEmail: email });
        console.log(student);

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        // Generate a JWT token and store the student's Object ID
        const token = jwt.sign({ studentId: student._id }, JWT_SECRET, {
            expiresIn: '1h', // Token expiration time
        });
        console.log(token);

        // Send back the token
        res.status(200).json({
            message: 'Student found successfully!',
            token, // Send the JWT token containing studentId
            studentId: student._id // You can send the ID for reference
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



// Fetch student details based on JWT token
router.get('/get-student-details', verifyToken, async (req, res) => {
    try {
        // The student ID will be stored in req.user (decoded from JWT)
        const studentId = req.user.studentId;

        const student = await StudentModel.findById(studentId);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.status(200).json(student);
    } catch (err) {
        console.error('Error fetching student details:', err);
        res.status(500).json({ error: err.message });
    }
});

// Add new student
router.post('/add-student', async (req, res) => {
    const student = new StudentModel(req.body);
    try {
        await student.save();
        res.status(200).send('Inserted data successfully');
    } catch (err) {
        console.error('Error inserting data:', err);
        res.status(500).send('Internal server error');
    }
});

// Get student by ID
router.get('/student/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const student = await StudentModel.findById(id);
        if (!student) {
            return res.status(404).send('Student not found');
        }
        res.status(200).json(student);
    } catch (err) {
        console.error('Error fetching student:', err);
        res.status(500).send('Internal server error');
    }
});

// Update student by ID
router.put('/update-student/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const updatedStudent = await StudentModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedStudent) {
            return res.status(404).send('Student not found');
        }
        res.status(200).json(updatedStudent);
    } catch (err) {
        console.error('Error updating student:', err);
        res.status(500).send('Internal server error');
    }
});

// Delete student by ID
router.delete('/delete-student/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedStudent = await StudentModel.findByIdAndDelete(id);
        if (!deletedStudent) {
            return res.status(404).send('Student not found');
        }
        res.status(200).send('Student deleted successfully');
    } catch (err) {
        console.error('Error deleting student:', err);
        res.status(500).send('Internal server error');
    }
});

module.exports = router;