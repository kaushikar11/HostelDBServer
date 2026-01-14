# Hostel Database - Server (Backend)

Express.js backend server for the Hostel Database Management System.

## Overview

RESTful API server built with Node.js and Express.js. Handles student management, image storage (MongoDB GridFS), complaints, and leaving forms.

## Features

- **RESTful API**: Clean API endpoints for all operations
- **MongoDB Integration**: Mongoose ODM for database operations
- **Image Storage**: MongoDB GridFS for storing student profile pictures
- **File Upload**: Multer middleware for handling file uploads
- **CORS Support**: Configurable CORS for client communication
- **Error Handling**: Comprehensive error handling middleware

## Tech Stack

- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **Mongoose**: MongoDB ODM
- **MongoDB GridFS**: File storage system
- **Multer**: File upload middleware
- **CORS**: Cross-origin resource sharing
- **dotenv**: Environment variable management

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or MongoDB Atlas)

## Installation

1. **Navigate to server directory**
   ```bash
   cd server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the `server` directory:
   ```env
   PORT=3001
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/hostelDB?retryWrites=true&w=majority
   CLIENT_URL=http://localhost:3000
   ```
   
   **For MongoDB Atlas:**
   1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   2. Create a cluster (free tier available)
   3. Create database user with username and password
   4. Whitelist IP address (use `0.0.0.0/0` for development)
   5. Get connection string and replace credentials
   6. URL-encode special characters in password if needed

## Running the Server

### Development Mode (with auto-reload)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will run on `http://localhost:3001` (or PORT from .env)

## Project Structure

```
server/
├── models/
│   ├── Student.js          # Student model
│   ├── Complaint.js        # Complaint model
│   └── LeavingForm.js      # Leaving form model
├── routes/
│   ├── studentRoutes.js    # Student CRUD operations
│   ├── adminRoutes.js      # Admin operations
│   ├── complainRoutes.js   # Complaint operations
│   ├── LeavingFormRoutes.js # Leaving form operations
│   └── imageRoutes.js      # Image upload/download (GridFS)
├── util/
│   └── (utility functions)
├── app.js                  # Main server file
├── package.json
└── .env                    # Environment variables (not in git)
```

## API Endpoints

### Health Check
- `GET /` - Server health check
  ```json
  {
    "message": "Hostel DB System API is running",
    "status": "OK"
  }
  ```

### Student Routes (`/api/students`)
- `GET /read` - Get all students
- `POST /add-student` - Add new student
- `GET /student/:id` - Get student by ID
- `PUT /update-student/:id` - Update student by ID
- `DELETE /delete-student/:id` - Delete student by ID

### Image Routes (`/api/images`)
- `POST /upload/:rollNo` - Upload student profile picture
  - Content-Type: `multipart/form-data`
  - Body: `file` (image file)
- `GET /:rollNo` - Get student profile picture
- `DELETE /:rollNo` - Delete student profile picture

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

## Database Models

### Student Model
```javascript
{
  name: String (required),
  rollNo: String (unique),
  studentEmail: String (required, unique),
  studentMobile: String,
  department: String,
  yearOfStudy: String,
  caste: String,
  religion: String,
  community: String,
  // Parent details
  fatherName: String,
  fatherOccupation: String,
  fatherIncome: String,
  fatherMobile: String,
  motherName: String,
  motherOccupation: String,
  motherIncome: String,
  motherMobile: String,
  // Address details
  residentialAddress1: String,
  residentialAddress2: String,
  residentialAddress3: String,
  residentialCity: String,
  residentialState: String,
  residentialPincode: String,
  // Guardian details
  localGuardianName: String,
  localGuardianMobile: String,
  localGuardianAddress1: String,
  localGuardianAddress2: String,
  localGuardianAddress3: String,
  localGuardianCity: String,
  localGuardianState: String,
  localGuardianPincode: String,
  // Other
  siblings: String,
  allergies: String,
  healthProblems: String,
  inHostel: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

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

## Environment Variables

### Required
```env
PORT=3001
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/hostelDB
```

### Optional
```env
CLIENT_URL=http://localhost:3000
NODE_ENV=production
```

## CORS Configuration

The server is configured to accept requests from:
- `CLIENT_URL` from environment variables
- `http://localhost:3000` (for local development)

Update `app.js` to add more allowed origins:
```javascript
const allowedOrigins = [
  process.env.CLIENT_URL || 'https://your-client-url.vercel.app',
  'http://localhost:3000'
];
```

## MongoDB GridFS

Student profile pictures are stored in MongoDB GridFS:
- **Bucket**: `student_images`
- **File naming**: `{rollNo}.jpg` (or original extension)
- **Upload endpoint**: `POST /api/images/upload/:rollNo`
- **Download endpoint**: `GET /api/images/:rollNo`
- **Delete endpoint**: `DELETE /api/images/:rollNo`

## Error Handling

The server includes comprehensive error handling:
- 404 handler for unknown routes
- 500 handler for server errors
- MongoDB connection error handling
- Request validation errors

## Deployment

### Render (Recommended)

1. Connect GitHub repository
2. Create new Web Service
3. Set build command: `cd server && npm install`
4. Set start command: `cd server && npm start`
5. Add environment variables
6. Deploy

### Railway

1. Create new project from GitHub
2. Add environment variables
3. Deploy

### Heroku

1. Create new app
2. Connect GitHub
3. Set buildpacks
4. Add config vars (environment variables)
5. Deploy

## Troubleshooting

### MongoDB Connection Failed
- Check `MONGODB_URI` in `.env`
- Verify IP is whitelisted in MongoDB Atlas
- Check username/password are correct
- URL-encode special characters in password

### Port Already in Use
- Change `PORT` in `.env`
- Kill process using the port: `lsof -ti:3001 | xargs kill`

### CORS Errors
- Verify `CLIENT_URL` is set correctly
- Check allowed origins in `app.js`
- Ensure client URL matches exactly

### Image Upload Issues
- Verify GridFS is working
- Check file size limits
- Ensure multer is configured correctly
- Check MongoDB connection

## Development Tips

1. **Use nodemon**: Automatically restarts server on file changes
2. **Check logs**: Server logs show connection status and errors
3. **Test endpoints**: Use Postman or curl to test API
4. **MongoDB Compass**: Use for database inspection

## Security Notes

1. **Never commit `.env` file** to version control
2. **Use strong MongoDB passwords**
3. **Restrict network access** in production
4. **Validate all inputs** before database operations
5. **Use HTTPS** in production

## License

[Your License Here]
