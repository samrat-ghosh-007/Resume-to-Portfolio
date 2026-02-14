const express = require("express");
const router = express.Router();
const resumeController = require("../controllers/resume.controller");

router.post("/generate", resumeController.generateResume);

module.exports = router;


