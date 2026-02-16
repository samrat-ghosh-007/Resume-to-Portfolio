const express = require("express");
const router = express.Router();
const multer = require("multer");
const generateController = require("../controllers/generate.controller");


// const upload = multer({
//   storage: multer.memoryStorage(),
//   limits: {
//     fileSize: 5 * 1024 * 1024 
//   },
//   fileFilter: (req, file, cb) => {
//     if (file.mimetype !== "application/pdf") {
//       cb(new Error("Only PDF files are allowed"), false);
//     } else {
//       cb(null, true);
//     }
//   }
// });


const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024
  },
  fileFilter: (req, file, cb) => {

    // If resume → allow only PDF
    if (file.fieldname === "resume") {
      if (file.mimetype === "application/pdf") {
        cb(null, true);
      } else {
        cb(new Error("Resume must be a PDF file"), false);
      }
    }

    // If profileImage → allow only PNG
    else if (file.fieldname === "profileImage") {
      if (file.mimetype === "image/png" || "image/jpg") {
        cb(null, true);
      } else {
        cb(new Error("Profile image must be PNG format"), false);
      }
    }

    else {
      cb(new Error("Invalid file field"), false);
    }
  }
});

router.post(
  "/",
  upload.fields([
  { name: "resume", maxCount: 1 },
  { name: "profileImage", maxCount: 1 }
]),
  generateController.generatePortfolio
);

module.exports = router;
