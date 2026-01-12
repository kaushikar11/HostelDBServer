const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const { GridFSBucket } = require('mongodb');
const router = express.Router();

// Get GridFSBucket instance
const getBucket = () => {
  const db = mongoose.connection.db;
  return new GridFSBucket(db, { bucketName: 'studentPhotos' });
};

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 100 * 1024 // 100KB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  }
});

// Upload image
router.post('/upload/:rollNo', upload.single('photo'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const rollNo = req.params.rollNo;
    if (!rollNo) {
      return res.status(400).json({ error: 'Roll number is required' });
    }

    const bucket = getBucket();
    const filename = `${rollNo}_photo.jpg`;

    // Delete existing image if any
    try {
      const files = await bucket.find({ filename }).toArray();
      if (files.length > 0) {
        await Promise.all(files.map(file => bucket.delete(file._id)));
      }
    } catch (err) {
      // File doesn't exist, continue
    }

    // Create upload stream
    const uploadStream = bucket.openUploadStream(filename, {
      contentType: req.file.mimetype
    });

    uploadStream.on('finish', (file) => {
      res.status(200).json({
        message: 'Image uploaded successfully',
        fileId: file._id,
        filename: file.filename
      });
    });

    uploadStream.on('error', (err) => {
      res.status(500).json({ error: 'Error uploading image', message: err.message });
    });

    uploadStream.end(req.file.buffer);
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Error uploading image', message: error.message });
  }
});

// Get image by roll number
router.get('/:rollNo', async (req, res) => {
  try {
    const rollNo = req.params.rollNo;
    const bucket = getBucket();
    const filename = `${rollNo}_photo.jpg`;
    
    const files = await bucket.find({ filename }).toArray();
    
    if (!files || files.length === 0) {
      return res.status(404).json({ error: 'Image not found' });
    }

    const file = files[0];
    
    // Set content type
    res.set('Content-Type', file.contentType || 'image/jpeg');
    
    // Create read stream
    const downloadStream = bucket.openDownloadStreamByName(filename);

    downloadStream.on('error', (err) => {
      res.status(500).json({ error: 'Error reading image', message: err.message });
    });

    downloadStream.pipe(res);
  } catch (error) {
    console.error('Get image error:', error);
    res.status(500).json({ error: 'Error retrieving image', message: error.message });
  }
});

// Delete image by roll number
router.delete('/:rollNo', async (req, res) => {
  try {
    const rollNo = req.params.rollNo;
    const bucket = getBucket();
    const filename = `${rollNo}_photo.jpg`;
    
    const files = await bucket.find({ filename }).toArray();
    
    if (!files || files.length === 0) {
      return res.status(404).json({ error: 'Image not found' });
    }

    await Promise.all(files.map(file => bucket.delete(file._id)));
    res.status(200).json({ message: 'Image deleted successfully' });
  } catch (error) {
    console.error('Delete image error:', error);
    res.status(500).json({ error: 'Error deleting image', message: error.message });
  }
});

module.exports = router;

