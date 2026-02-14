const Groq = require("groq-sdk");
const pdfService = require("../services/pdf.service");
const extractJsonFromText = require("../utils/extractJsonFromText");


const fs = require("fs-extra");


const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

exports.analyzeResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Resume PDF required" });
    }

    const resumeText = await pdfService.extractText(req.file.buffer);
   
   
    const prompt = `
You are an ATS Resume Analyzer.

Return ONLY JSON:

{
  "atsScore": number,
  "strengths": [],
  "missingSkills": [],
  "suggestions": []
}

Resume:
${resumeText}
`;

    
    const ai = await groq.chat.completions.create({
      model: "qwen/qwen3-32b",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
    });

const resultText = ai?.choices?.[0]?.message?.content || "";


let parsed = null;
try {
  parsed = extractJsonFromText(resultText);
} catch (e) {
  console.error("Extraction error:", e);
}

if (!parsed) {
  
  return res.status(500).json({
    error: "AI returned invalid JSON",
    raw: resultText.slice(0, 5000) 
  });

  
}

res.json(parsed);

  } catch (err) {
    console.error(err);
    res.status(500).send("Resume analysis failed");
  }
};