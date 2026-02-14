// const pdfService = require("../services/createPDF.service");
// const { sendSuccess, sendError } = require("../utils/response");

// exports.generateResume = async (req, res) => {
//   try {
//     const pdfBuffer = await pdfService.generatePDF(req.body);

//     res.set({
//       "Content-Type": "application/pdf",
//       "Content-Disposition": "attachment; filename=resume.pdf",
//       "Content-Length": pdfBuffer.length
//     });

//     res.status(200).send(pdfBuffer);

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "Resume generation failed"
//     });
//   }
// };


const pdfService = require("../services/createPDF.service");
const cloudinaryService = require("../services/cloudinary.service");

exports.generateResume = async (req, res) => {
  try {

    // 1. Generate PDF locally
    const filePath = await pdfService.generatePDF(req.body);

    // 2. Upload to Cloudinary
    const uploadResult = await cloudinaryService.uploadPDF(filePath);

    const publicUrl = uploadResult.secure_url;
    const publicId = uploadResult.public_id;

const downloadUrl = publicUrl.replace(
  "/upload/",
  "/upload/fl_attachment/"
);


    // 3. Auto delete after 24 hours
    setTimeout(async () => {
      await cloudinary.uploader.destroy(publicId, {
        resource_type: "raw"
      });
    }, 24 * 60 * 60 * 1000);

    return res.status(200).json({
      success: true,
      downloadUrl: downloadUrl
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Resume generation failed"
    });
  }
};
