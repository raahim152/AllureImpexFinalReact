const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('../config/cloudinary');
const { auth, admin } = require('../middleware/auth');

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    // Accept images and PDFs
    const allowedTypes = /jpeg|jpg|png|gif|webp|pdf/;
    const mimetype = allowedTypes.test(file.mimetype);
    const extname = allowedTypes.test(file.originalname.toLowerCase());
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Error: Only image files (JPEG, PNG, GIF, WEBP) and PDFs are allowed!'));
    }
  }
});

// @route   POST /api/uploads
// @desc    Upload a file to Cloudinary
router.post('/', auth, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    // Convert buffer to base64
    const b64 = Buffer.from(req.file.buffer).toString('base64');
    const dataURI = `data:${req.file.mimetype};base64,${b64}`;
    
    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(dataURI, {
      folder: process.env.CLOUDINARY_UPLOAD_FOLDER || 'allure_impex',
      resource_type: 'auto',
      transformation: [
        { width: 1200, height: 800, crop: 'limit' }, // Resize large images
        { quality: 'auto:good' } // Optimize quality
      ]
    });

    res.json({
      success: true,
      message: 'File uploaded to Cloudinary successfully',
      data: {
        url: result.secure_url,
        public_id: result.public_id,
        format: result.format,
        bytes: result.bytes,
        width: result.width,
        height: result.height,
        originalname: req.file.originalname
      }
    });
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'File upload failed'
    });
  }
});

// @route   DELETE /api/uploads/:public_id
// @desc    Delete a file from Cloudinary
router.delete('/:public_id', auth, admin, async (req, res) => {
  try {
    const { public_id } = req.params;
    
    const result = await cloudinary.uploader.destroy(public_id);
    
    if (result.result === 'ok') {
      res.json({
        success: true,
        message: 'File deleted successfully'
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'File not found'
      });
    }
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    res.status(500).json({
      success: false,
      message: 'File deletion failed'
    });
  }
});

// @route   POST /api/uploads/multiple
// @desc    Upload multiple files
router.post('/multiple', auth, upload.array('files', 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No files uploaded'
      });
    }

    const uploadPromises = req.files.map(async (file) => {
      const b64 = Buffer.from(file.buffer).toString('base64');
      const dataURI = `data:${file.mimetype};base64,${b64}`;
      
      return await cloudinary.uploader.upload(dataURI, {
        folder: process.env.CLOUDINARY_UPLOAD_FOLDER || 'allure_impex',
        resource_type: 'auto'
      });
    });

    const results = await Promise.all(uploadPromises);
    
    const filesData = results.map(result => ({
      url: result.secure_url,
      public_id: result.public_id,
      format: result.format,
      bytes: result.bytes
    }));

    res.json({
      success: true,
      message: `${req.files.length} files uploaded successfully`,
      data: filesData
    });
  } catch (error) {
    console.error('Multiple upload error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'File upload failed'
    });
  }
});

module.exports = router;