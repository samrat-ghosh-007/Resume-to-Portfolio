function generateResumeHTML(data) {

  const skills = data.skills || [];
  const experience = data.experience || [];
  const projects = data.projects || [];
  const education = data.education || [];

  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <style>
      body {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 12px;
        line-height: 1.6;
        margin: 40px;
        color: #000;
      }

      .header {
        text-align: center;
        margin-bottom: 15px;
      }

      .name {
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 5px;
      }

      .contact {
        font-size: 12px;
      }

      .section {
        margin-top: 20px;
      }

      .section-title {
        font-size: 14px;
        font-weight: bold;
        border-bottom: 1px solid #000;
        padding-bottom: 4px;
        margin-bottom: 8px;
        text-transform: uppercase;
      }

      .job-title {
        font-weight: bold;
      }

      .sub-info {
        font-style: italic;
        margin-bottom: 5px;
      }

      ul {
        margin: 5px 0 10px 20px;
        padding: 0;
      }

      li {
        margin-bottom: 4px;
      }

    </style>
  </head>

  <body>

    <!-- Header -->
    <div class="header">
      <div class="name">${data.fullName || ""}</div>
      <div class="contact">
       ${data.email || ""} | 
        ${data.phone || ""} | 
        ${data.linkedin || ""} | 
        ${data.github || ""} |
      </div>
    </div>

    <!-- Summary -->
    <div class="section">
      <div class="section-title">Professional Summary</div>
      <div>${data.summary || ""}</div>
    </div>

    <!-- Skills -->
    <div class="section">
      <div class="section-title">Skills</div>
      <div>${skills.join(", ")}</div>
    </div>

    <!-- Experience -->
    <div class="section">
      <div class="section-title">Experience</div>
      ${experience.map(exp => `
        <div>
          <div class="job-title">${exp.role || ""} - ${exp.company || ""}</div>
          <div class="sub-info">${exp.duration || ""}</div>
          <ul>
            ${(exp.responsibilities || []).map(r => `<li>${r}</li>`).join("")}
          </ul>
        </div>
      `).join("")}
    </div>

    <!-- Projects -->
    <div class="section">
      <div class="section-title">Projects</div>
      ${projects.map(project => `
        <div>
          <div class="job-title">${project.title || ""}</div>
          <ul>
            ${(project.description || []).map(d => `<li>${d}</li>`).join("")}
          </ul>
        </div>
      `).join("")}
    </div>

    <!-- Education -->
    <div class="section">
      <div class="section-title">Education</div>
      ${education.map(edu => `
        <div>
          <div class="job-title">${edu.degree || ""} - ${edu.institution || ""}</div>
          <div class="sub-info">${edu.year || ""}</div>
        </div>
      `).join("")}
    </div>

  </body>
  </html>
  `;
}

module.exports = { generateResumeHTML };
