// exports.generateDesign = async () => {
//   try {
    
// const prompt = `
// You are a senior UI/UX designer.

// Generate ONLY CSS and JavaScript.

// The HTML already contains:
// #navbar, #hero, #about, #skills, #projects, #experience,
// #education, #contact, footer

// Classes:
// .section
// .card
// .project-card
// .experience-card
// .skill-tag
// .profile-image

// Requirements:
// - Poppins font
// - Blue/Indigo gradient hero
// - Glassmorphism cards
// - Smooth scroll
// - Scroll reveal animation
// - Hover animations
// - Responsive design
// - Professional spacing

// Return strictly in this JSON format:
// {
//   "css": "CSS CODE HERE",
//   "js": "JS CODE HERE"
// }
// `;







//     const response = await fetch(
//       "https://api.groq.com/openai/v1/chat/completions",
//       {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           model: "llama-3.1-8b-instant",
//           messages: [
//             { role: "system", content: "You generate clean production-ready CSS and JS." },
//             { role: "user", content: prompt },
//           ],
//           temperature: 0.2,
//         }),
//       }
//     );

//     if (!response.ok) {
//       const errorText = await response.text();
//       throw new Error(`Groq API error: ${errorText}`);
//     }

//     const data = await response.json();

//     let html = data.choices[0].message.content;

    
//     html = html
//       .replace(/```html/g, "")
//       .replace(/```/g, "")
//       .trim();

//     return html;

//     console.log()

//   } catch (error) {
//     console.error("Groq Error:", error);
//     throw new Error("Failed to generate portfolio HTML");
//   }
// };



// exports.generateDesign = async () => {
//   try {
//     const prompt = `
// You are a senior UI/UX designer.

// Generate ONLY CSS and JavaScript.

// The HTML already contains:
// #navbar, #hero, #about, #skills, #projects, #experience,
// #education, #contact, footer

// Classes:
// .section
// .card
// .project-card
// .experience-card
// .skill-tag
// .profile-image

// Requirements:
// - Poppins font
// - Blue/Indigo gradient hero
// - Glassmorphism cards
// - Smooth scroll
// - Scroll reveal animation
// - Hover animations
// - Responsive design
// - Professional spacing

// Return strictly in this JSON format:
// {
//   "css": "CSS CODE HERE",
//   "js": "JS CODE HERE"
// }
// `;

//     const response = await fetch(
//       "https://api.groq.com/openai/v1/chat/completions",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
//         },
//         body: JSON.stringify({
//           model: "llama-3.1-8b-instant",
//           messages: [
//             { role: "user", content: prompt }
//           ],
//           temperature: 0.4,
//           max_tokens: 1500
//         })
//       }
//     );

//     const data = await response.json();

//     const content = data.choices[0].message.content;

    
//     const cleaned = content
//       .replace(/```json/g, "")
//       .replace(/```/g, "")
//       .trim();

//     return JSON.parse(cleaned);

//   } catch (error) {
//     console.error("Groq Design Generation Error:", error);

//     // fallback design to avoid crash
//     return {
//       css: `
//         body { font-family: 'Poppins', sans-serif; margin:0; padding:0; }
//         .section { padding:60px 10%; }
//         .card { background:white; padding:20px; border-radius:12px; box-shadow:0 10px 30px rgba(0,0,0,0.1); margin-bottom:20px; }
//         .hero-section { background: linear-gradient(135deg, #4f46e5, #6366f1); color:white; text-align:center; padding:100px 10%; }
//       `,
//       js: `console.log("Fallback design loaded");`
//     };
//   }
// };


exports.generateDesign = async () => {
  try {
    const prompt = `
You are an award-winning senior frontend architect and UI designer.

Generate premium, modern, production-quality CSS and minimal JavaScript.

IMPORTANT:
- DO NOT return JSON
- DO NOT use backticks
- DO NOT explain anything
- DO NOT include HTML
- Only CSS and JS

Return strictly in this format:

---CSS---
<css here>
---JS---
<js here>

DESIGN REQUIREMENTS:

Visual Style:
- Modern SaaS landing page style
- Indigo / Blue gradient hero
- Clean white sections
- Glassmorphism cards
- Soft shadows
- Subtle border highlights
- Elegant hover transitions

Typography:
- Font: 'Poppins'
- Clear hierarchy
- Large hero heading (clamp responsive)
- Proper spacing scale (8px system)

Layout:
- Max width container (1200px)
- Centered layout
- Generous whitespace
- Proper section padding (100px desktop, 60px mobile)

Components:
- Sticky navbar with blur background on scroll
- Hero with gradient + subtle radial overlay
- Profile image: circular, 160px, shadowed
- Cards with hover lift effect
- Skill tags as pill badges
- Smooth scroll behavior
- Fade-in scroll reveal animations

Animations:
- Use CSS transitions
- Use transform + opacity only
- Avoid heavy JS

Responsiveness:
- Mobile first
- Use clamp() for typography
- Breakpoint at 768px

Quality:
- Use CSS variables (:root)
- Clean structure
- No inline styles
- No !important
- No messy repeated rules
- Professional spacing

Make it look like a real premium portfolio.
`;


    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.4,
          max_tokens: 1500
        })
      }
    );

    const data = await response.json();
    const content = data.choices[0].message.content;

    // Extract CSS
    const cssMatch = content.match(/---CSS---([\s\S]*?)---JS---/);
    const jsMatch = content.match(/---JS---([\s\S]*)/);

    const css = cssMatch ? cssMatch[1].trim() : "";
    const js = jsMatch ? jsMatch[1].trim() : "";

    return { css, js };

  } catch (err) {
    console.error("Groq Design Generation Error:", err);

    return {
      css: `
body {
  font-family: 'Poppins', sans-serif;
  margin: 0;
}
.profile-image {
  width: 160px;
  height: 160px;
  border-radius: 50%;
  object-fit: cover;
}
`,
      js: `console.log("Fallback loaded");`
    };
  }
};
