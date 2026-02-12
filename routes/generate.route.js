const express = require("express");
const router = express.Router();
const multer = require("multer");
const generateController = require("../controllers/generate.controller");


const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      cb(new Error("Only PDF files are allowed"), false);
    } else {
      cb(null, true);
    }
  }
});

router.post(
  "/",
  upload.single("resume"),
  generateController.generatePortfolio
);

module.exports = router;
