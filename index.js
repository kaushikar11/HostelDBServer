require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const StudentModel = require('./models/Student');

const app = express();
const PORT = 3031;

app.use(express.json());
app.use(cors({ origin: ["http://localhost:3000"] }));

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected successfully");
}).catch((error) => {
    console.error("Error caught:", error);
});

app.get('/read', async (req, res) => {
    try {
        const data = await StudentModel.find({});
        res.status(200).json(data);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
});

app.post('/add-student', async (req, res) => {
    const student = new StudentModel(req.body);
    try {
        await student.save();
        res.status(200).send('Inserted data successfully');
    } catch (err) {
        console.error('Error inserting data:', err);
        res.status(500).send('Internal server error');
    }
});

app.get('/student/:id', async (req, res) => {
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

// Update student details by ID
app.put('/update-student/:id', async (req, res) => {
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
app.delete('/delete-student/:id', async (req, res) => {
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

app.listen(PORT, () => {
    console.log("Server running....");
});
