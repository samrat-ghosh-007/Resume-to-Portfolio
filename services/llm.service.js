exports.generateHTML = async (resumeText) => {
  try {
    const prompt = `
    
    You are an expert UI/UX designer and senior frontend developer.

Create a visually stunning, modern portfolio website.

Design Requirements:
- Clean layout
- Hero section with large heading and gradient background
- Smooth scrolling
- Glassmorphism or subtle shadow cards
- Modern typography (Google Fonts import)
- Responsive for mobile, tablet, desktop
- Hover animations on buttons and cards
- Section spacing with good white space
- Sticky navbar
- Animated section reveal on scroll
- Professional color palette (not random colors)
- Visually Appealing
- If any section is missing in resume, intelligently infer reasonable professional content.


Technical Requirements:
- Single index.html file
- Inline CSS inside <style>
- Inline JS inside <script>
- Use CSS animations or transitions
- No markdown
- Return ONLY raw HTML

Resume Content:
${resumeText}`;

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [
            { role: "system", content: "You generate clean production-ready HTML." },
            { role: "user", content: prompt },
          ],
          temperature: 0.7,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Groq API error: ${errorText}`);
    }

    const data = await response.json();

    let html = data.choices[0].message.content;

    
    html = html
      .replace(/```html/g, "")
      .replace(/```/g, "")
      .trim();

    return html;

  } catch (error) {
    console.error("Groq Error:", error);
    throw new Error("Failed to generate portfolio HTML");
  }
};
