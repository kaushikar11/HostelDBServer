require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const studentRoutes = require('./routes/studentRoutes');
const adminRoutes = require('./routes/adminRoutes');
const leavingFormRoutes = require('./routes/LeavingFormRoutes');

const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';

const app = express();
const PORT = 3031;

app.use(express.json());

// CORS options
const corsOptions = {
    origin: '*', // Allow any origin (Use '*' to allow all origins)
    credentials: true,  // Allow cookies and credentials
    optionsSuccessStatus: 200, // Response for successful OPTIONS requests
};

app.use(cors(corsOptions));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // Allow any origin
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
   
})
.then(() => {
    console.log("Connected successfully to MongoDB");
})
.catch((error) => {
    console.error("Error connecting to MongoDB:", error);
});

// Use Routes
app.use('/api/students', studentRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/leaving-forms', leavingFormRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
