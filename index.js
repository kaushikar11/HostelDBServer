require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const studentRoutes = require('./routes/studentRoutes');
const adminRoutes = require('./routes/adminRoutes');
const leavingFormRoutes = require('./routes/LeavingFormRoutes');
// const complaintRoutes = require('./routes/complaintRoutes');

const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';

const app = express();
const PORT = 3031;

app.use(express.json());
const corsOptions = {
    origin: CLIENT_URL, // Only allow this origin
    optionsSuccessStatus: 200, // Response for successful OPTIONS requests
};
app.use(cors(corsOptions));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connected successfully to MongoDB");
}).catch((error) => {
    console.error("Error connecting to MongoDB:", error);
});

// Use Routes
app.use('/api/students', studentRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/leaving-forms', leavingFormRoutes);
// app.use('/api/complaints', complaintRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});