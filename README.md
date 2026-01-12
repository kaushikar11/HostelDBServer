# Hostel DB System - Server

Backend server for the Ladies Hostel Database Management System.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   
   Create a `.env` file in the server directory with the following variables:
   
   ```env
   PORT=3001
   MONGODB_URI=mongodb://localhost:27017/hostelDB
   ```
   
   **Important:** 
   - Replace `MONGODB_URI` with your MongoDB connection string
   - For MongoDB Atlas, use: `mongodb+srv://username:password@cluster.mongodb.net/hostelDB`

3. **Start the Server**
   
   For development (with auto-reload):
   ```bash
   npm run dev
   ```
   
   For production:
   ```bash
   npm start
   ```

4. **Server Endpoints**
   
   The server will run on `http://localhost:3000` (or the PORT specified in .env)
   
   - Health check: `GET /`
   - Student routes: `/api/students/*`
   - Admin routes: `/api/admin/*`
   - Complaint routes: `/api/complaints/*`
   - Leaving form routes: `/api/leaving-forms/*`

## Project Structure

```
server/
├── models/          # Mongoose models (Student, Complaint, LeavingForm)
├── routes/          # Express route handlers
├── util/            # Utility functions
├── app.js           # Main server file
└── package.json     # Dependencies and scripts
```

## API Routes

### Student Routes (`/api/students`)
- `GET /read` - Get all students
- `POST /add-student` - Add new student
- `GET /student/:id` - Get student by ID
- `PUT /update-student/:id` - Update student by ID
- `DELETE /delete-student/:id` - Delete student by ID

### Admin Routes (`/api/admin`)
- `GET /hostel-absentees` - Get all hostel absentees
- `PATCH /update-hostel-status/:studentId` - Update student hostel status

### Complaint Routes (`/api/complaints`)
- `POST /submit-complaint` - Submit a complaint
- `GET /complaints` - Get all complaints
- `PATCH /resolve-complaint/:id` - Resolve a complaint

### Leaving Form Routes (`/api/leaving-forms`)
- `POST /submit-leaving-form` - Submit leaving form
- `GET /pending-requests` - Get pending leaving requests
- `PATCH /update-status/:id` - Update leaving form status (accepted/rejected)
- `GET /hostel-absentees` - Get hostel absentees
- `PATCH /update-hostel-status/:studentId` - Update hostel status

## Models

### Student Model
- `studentName` (required)
- `studentEmail` (required, unique)
- `studentId`
- `roomNumber`
- `phoneNumber`
- `parentMobile`
- `address`
- `inHostel` (default: true)
- `course`
- `year`

### Complaint Model
- `studentName` (required)
- `email` (required)
- `description` (required)
- `status` (pending/resolved, default: pending)

### LeavingForm Model
- `studentId` (required, reference to Student)
- `studentName` (required)
- `parentMobile` (required)
- `reason` (required)
- `leavingTime` (required, Date)
- `arrivalTime` (required, Date)
- `status` (pending/accepted/rejected, default: pending)

## Notes

- All routes return JSON responses
- Error handling is implemented for common scenarios
- MongoDB connection is established automatically on server start

