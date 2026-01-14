# Hostel Database - Server (Backend)

Express.js backend server for the Hostel Database Management System.

## Project Overview

A comprehensive full-stack application for managing a university hostel database with a professional admin dashboard interface. This is the backend (server) portion of the application.

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

## Full Project Structure

```
HostelDB/
├── client/                 # React frontend application
│   ├── public/            # Static files
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── *.js          # Main components
│   │   └── *.css         # Stylesheets
│   └── package.json
├── server/                # Node.js backend (this directory)
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── util/             # Utility functions
│   ├── app.js            # Main server file
│   └── package.json
└── README.md             # Project documentation
```

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or MongoDB Atlas)

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd HostelDB
```

### 2. Install Dependencies

```bash
cd server
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the `server` directory (you can copy `.env.example` as a template):

```env
# Server Port
PORT=3001

# MongoDB Connection String
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/hostelDB?retryWrites=true&w=majority

# Client URL for CORS configuration
CLIENT_URL=http://localhost:3000
```

**For MongoDB Atlas:**
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster (free tier available)
3. Create database user with username and password
4. Whitelist IP address (use `0.0.0.0/0` for development)
5. Get connection string and replace credentials
6. URL-encode special characters in password if needed

**For local MongoDB:**
```env
MONGODB_URI=mongodb://localhost:27017/hostelDB
```

### 4. Running the Server

#### Development Mode (with auto-reload)
```bash
npm run dev
```

#### Production Mode
```bash
npm start
```

The server will run on `http://localhost:3001` (or PORT from .env)

### 5. Start the Frontend Client

After the server is running, start the client application. See `../client/README.md` for detailed setup instructions.

```bash
cd ../client
npm install
# Create .env file with Firebase config and server URL
npm start
```

The client will run on `http://localhost:3000`

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
5. Add environment variables:
   - `PORT`: 3001 (or your preferred port)
   - `MONGODB_URI`: Your MongoDB connection string
   - `CLIENT_URL`: Your Vercel client URL
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
- Ensure MongoDB Atlas cluster is running

### Port Already in Use
- Change `PORT` in `.env`
- Kill process using the port: `lsof -ti:3001 | xargs kill`

### CORS Errors
- Verify `CLIENT_URL` is set correctly
- Check allowed origins in `app.js`
- Ensure client URL matches exactly (including protocol and port)
- Check server logs for CORS error details

### Image Upload Issues
- Verify GridFS is working
- Check file size limits
- Ensure multer is configured correctly
- Check MongoDB connection
- Verify file permissions

### API Calls Failing
- Check server is running
- Verify CORS configuration
- Check MongoDB connection
- Review server logs for errors

## Development

### Adding New Features

1. **Backend Routes**: Add routes in `routes/`
2. **Database Models**: Add models in `models/`
3. **API**: Follow RESTful conventions
4. **Error Handling**: Use consistent error response format

### Code Style

- Use consistent naming conventions
- Add comments for complex logic
- Keep routes modular and organized
- Follow Express.js best practices
- Use async/await for asynchronous operations

### Development Tips

1. **Use nodemon**: Automatically restarts server on file changes
2. **Check logs**: Server logs show connection status and errors
3. **Test endpoints**: Use Postman or curl to test API
4. **MongoDB Compass**: Use for database inspection
5. **Environment Variables**: Restart server after changing `.env` variables

## Security Notes

1. **Never commit `.env` file** to version control
2. **Use strong MongoDB passwords**
3. **Restrict network access** in production (MongoDB Atlas)
4. **Validate all inputs** before database operations
5. **Use HTTPS** in production
6. **CORS**: Only allow trusted origins in production
7. **MongoDB Password**: URL-encode special characters in connection string

## License

[Your License Here]

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review server logs for detailed error messages
3. Check MongoDB Atlas console for database issues
4. See `../client/README.md` for frontend-related issues

## Acknowledgments

- Design inspired by professional university admin dashboards
- Built with modern web technologies
- MongoDB GridFS for efficient image storage
