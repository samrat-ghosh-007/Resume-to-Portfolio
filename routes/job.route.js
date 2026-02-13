const express = require("express");
const multer = require("multer");
const { matchJobs } = require("../controllers/job.controller");

const router = express.Router();


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

router.post("/", upload.single("resume"), matchJobs);

module.exports = router;
