const { extractText } = require("../services/pdf.service");
const { generateCoverLetter } = require("../services/coverLetter.service");
const { generatePDFBuffer } = require("../services/pdfForCover.service");
const { uploadPDF } = require("../services/cloudinary.service");

exports.generateCoverLetterController = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Resume required" });
    }

    const { company, role, jobDescription } = req.body;

    if (!company || !role || !jobDescription) {
      return res.status(400).json({ message: "All fields required" });
    }

    
    const resumeText = await extractText(req.file.buffer);

    
    const coverLetter = await generateCoverLetter({
      resumeText,
      company,
      role,
      jobDescription,
    });

    
    const pdfBuffer = await generatePDFBuffer(coverLetter);

    
    const pdfUrl = await uploadPDF(pdfBuffer);

   
    res.status(200).json({
      success: true,
      downloadLink: pdfUrl,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
