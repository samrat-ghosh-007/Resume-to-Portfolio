const pdfService = require("../services/pdf.service");
const llmService = require("../services/llm.service");
const deployService = require("../services/deploy.service");
const fs = require("fs-extra");
const { v4: uuidv4 } = require("uuid");


exports.generatePortfolio = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Resume PDF required" });
    }

    
    const resumeText = await pdfService.extractText(req.file.buffer);

   
    const htmlCode = await llmService.generateHTML(resumeText);

    
    const deploymentUrl = await deployService.deploy(htmlCode);

    return res.json({
      success: true,
      portfolioUrl: `https://${deploymentUrl}`
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};
