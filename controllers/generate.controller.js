const pdfService = require("../services/pdf.service");
const {generateDesign} = require("../services/llm.service");
const deployService = require("../services/deploy.service");
const cloudinaryService = require("../services/cloudinary.service");
const { structureResume } = require("../utils/structureResume.service");
const {generatePortfolioHTML}  = require("../templates/portfolio.template");
const {parseResumeText} = require("../utils/parseResume");



const fs = require("fs-extra");
const { v4: uuidv4 } = require("uuid");


// exports.generatePortfolio = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: "Resume PDF required" });
//     }

    
//     const resumeText = await pdfService.extractText(req.file.buffer);

   
//     const htmlCode = await llmService.generateHTML(resumeText);

    
//     const deploymentUrl = await deployService.deploy(htmlCode);

//     return res.json({
//       success: true,
//       portfolioUrl: `https://${deploymentUrl}`
//     });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Something went wrong" });
//   }
// };


exports.generatePortfolio = async (req, res) => {
  try {
    if (!req.files?.resume) {
      return res.status(400).json({ message: "Resume PDF required" });
    }

    if (!req.files?.profileImage) {
      return res.status(400).json({ message: "Profile image required" });
    }


    

    
    const resumeBuffer = req.files.resume[0].buffer;
    const resumeText = await pdfService.extractText(resumeBuffer);

    

    const structuredText = structureResume(resumeText);

    const parsedData = parseResumeText(structuredText);

    // const imageBuffer = req.files.profileImage[0].buffer;
    // const imageUrl = await cloudinaryService.uploadImage(imageBuffer);

    const imageFile = req.files.profileImage[0];

    const profileImageUrl = await cloudinaryService.uploadImage(
      imageFile.buffer,
      imageFile.mimetype
    );

  



    console.log(parsedData);
    const design = await generateDesign();

    const html = generatePortfolioHTML(
      parsedData,
      profileImageUrl,
      design.css,
      design.js
  );

  
    
    const deploymentUrl = await deployService.deploy(html);

    return res.json({
      success: true,
      portfolioUrl: `https://${deploymentUrl}`
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};
