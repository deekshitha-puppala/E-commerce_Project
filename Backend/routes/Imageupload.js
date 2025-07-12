const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { authMiddleware } = require("../middlewares/Authmiddleware");

// Define the correct frontend directory path
const My_dirName = "C:\Users\puppa\OneDrive\Desktop\gumRoadProject\frontend"; 
// Make sure this path is accurate and points to where public/uploadedImages should be

// Set upload directory path
const uploadDir = path.resolve(__dirname, "../public/uploadedImages");


// Ensure the upload directory exists
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage });

// POST Route: /api/v1/image/upload
router.post("/upload", authMiddleware, upload.single("image"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        res.status(200).json({
            message: "Image uploaded successfully",
            imagePath: req.file.path, // Full server path
            imageName: req.file.filename, // Just the filename
        });
    } catch (error) {
        console.error("Error processing request:", error);
        res.status(500).json({
            error: "An error occurred while uploading the image.",
        });
    }
});

module.exports = router;