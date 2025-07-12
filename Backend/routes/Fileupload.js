const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { authMiddleware } = require("../middlewares/Authmiddleware");

const uploadDir = path.resolve(__dirname, "../public/uploadedFiles"); // changed for clarity

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === "text/plain") {
            cb(null, true);
        } else {
            cb(new Error("Only .txt files are allowed"), false);
        }
    },
});

router.post("/upload", authMiddleware, upload.single("file"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        res.status(200).json({
            message: "File uploaded successfully",
            filePath: req.file.path,
            fileName: req.file.filename,
        });
    } catch (error) {
        console.error("Error processing request:", error);
        res.status(500).json({
            error: "An error occurred while uploading the file.",
        });
    }
});

module.exports = router;
