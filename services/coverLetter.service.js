const axios = require("axios");

exports.generateCoverLetter = async ({
  resumeText,
  company,
  role,
  jobDescription,
}) => {
  const response = await axios.post(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      model: "llama-3.1-8b-instant",
      temperature: 0.6,
      messages: [
        {
          role: "system",
          content: `
You are an expert professional resume and cover letter writer.

IMPORTANT RULES:
- Output ONLY the final cover letter.
- Do NOT explain anything.
- Do NOT mention rules.
- Do NOT say "This cover letter..."
- Do NOT add commentary before or after.
- Maximum 200 words.
- Professional business format.
- No placeholders.
`,
        },
        {
          role: "user",
          content: `
Generate a professional, ATS-friendly cover letter using the information below.

Resume:
${resumeText}

Company: ${company}
Role: ${role}
Job Description:
${jobDescription}
`,
        },
      ],
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data.choices[0].message.content.trim();
};
