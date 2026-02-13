const fs = require("fs");
const parseResume = require("../services/pdf.service");
const fetchJobs = require("../services/job.service");

exports.matchJobs = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Resume PDF required" });
    }

    
    const resumeText = await parseResume.extractText(req.file.buffer);

    
    const skills = extractSkills(resumeText);

    
    const jobs = await fetchJobs(skills);

    res.json({
      extractedSkills: skills,
      jobs
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error processing resume" });
  }
};

function extractSkills(text) {
  const skillKeywords = [
    "javascript", "node", "react", "mongodb",
    "express", "python", "java", "sql",
    "aws", "docker", "kubernetes"
  ];

  const lowerText = text.toLowerCase();

  return skillKeywords.filter(skill =>
    lowerText.includes(skill)
  );
}
