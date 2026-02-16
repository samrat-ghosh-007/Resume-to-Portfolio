exports.generatePortfolioHTML = (data, profileImageUrl, styles = "", scripts = "") => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${data.name} | Portfolio</title>

<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap" rel="stylesheet">

<style>
  body {
    margin: 0;
    font-family: 'Poppins', sans-serif;
    background: #f8fafc;
    color: #1e293b;
  }

  .section {
    padding: 80px 10%;
  }

  h2 {
    margin-bottom: 30px;
    font-size: 28px;
  }

  /* NAVBAR */
  #navbar {
    position: sticky;
    top: 0;
    background: white;
    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
    z-index: 1000;
  }

  .nav-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 10%;
  }

  .nav-links {
    list-style: none;
    display: flex;
    gap: 20px;
  }

  .nav-links a {
    text-decoration: none;
    color: #1e293b;
    font-weight: 500;
  }

  /* HERO */
  .hero-section {
    background: linear-gradient(135deg, #4f46e5, #6366f1);
    color: white;
    text-align: center;
    padding: 120px 10%;
  }

  .hero-content {
    max-width: 800px;
    margin: auto;
  }

  .hero-content h1 {
    font-size: 42px;
    margin-bottom: 30px;
  }

  /* PROFILE IMAGE FIX */
  .profile-image {
    width: 180px;              /* fixed size */
    height: 180px;             /* equal height */
    border-radius: 50%;        /* circle */
    object-fit: cover;         /* crop nicely */
    border: 4px solid white;   /* clean border */
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    margin-top: 20px;
  }

  /* SKILLS */
  .skills-container {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
  }

  .skill-tag {
    background: #e0e7ff;
    padding: 8px 14px;
    border-radius: 20px;
    font-size: 14px;
  }

  /* CARDS */
  .card-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 25px;
  }

  .card {
    background: white;
    padding: 25px;
    border-radius: 16px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.05);
  }

  .duration {
    font-size: 14px;
    color: #64748b;
    margin-bottom: 10px;
  }

  footer {
    text-align: center;
    padding: 30px;
    background: #1e293b;
    color: white;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .section {
      padding: 60px 5%;
    }

    .hero-content h1 {
      font-size: 32px;
    }

    .profile-image {
      width: 140px;
      height: 140px;
    }
  }

${styles}
</style>

</head>
<body>

<nav id="navbar">
  <div class="nav-container">
    <h2 class="logo">${data.name}</h2>
    <ul class="nav-links">
      <li><a href="#hero">Home</a></li>
      <li><a href="#about">About</a></li>
      <li><a href="#skills">Skills</a></li>
      <li><a href="#projects">Projects</a></li>
      <li><a href="#experience">Experience</a></li>
      <li><a href="#education">Education</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
  </div>
</nav>

<section id="hero" class="section hero-section">
  <div class="hero-content">
    <h1>${data.name}</h1>
    <img src="${profileImageUrl}" alt="Profile Image" class="profile-image"/>
  </div>
</section>

<section id="about" class="section">
  <h2>About</h2>
  <p>${data.summary}</p>
</section>

<section id="skills" class="section">
  <h2>Skills</h2>
  <div class="skills-container">
    ${data.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join("")}
  </div>
</section>

<section id="projects" class="section">
  <h2>Projects</h2>
  <div class="card-container">
    ${data.projects.map(project => `
      <div class="card project-card">
        <h3>${project.name}</h3>
        ${
          project.description && project.description.length
            ? `<ul>${project.description.map(d => `<li>${d}</li>`).join("")}</ul>`
            : ""
        }
      </div>
    `).join("")}
  </div>
</section>

<section id="experience" class="section">
  <h2>Experience</h2>
  <div class="card-container">
    ${data.experience.map(job => `
      <div class="card experience-card">
        <h3>${job.role}</h3>
        <p class="duration">${job.duration}</p>
        <ul>
          ${job.responsibilities.map(r => `<li>${r}</li>`).join("")}
        </ul>
      </div>
    `).join("")}
  </div>
</section>

<section id="education" class="section">
  <h2>Education</h2>
  <p>${data.education}</p>
</section>

<section id="contact" class="section">
  <h2>Contact</h2>
  <p>Phone: ${data.contact.phone}</p>
  <p><a href="${data.contact.linkedin}" target="_blank">LinkedIn</a></p>
  <p><a href="${data.contact.github}" target="_blank">GitHub</a></p>
</section>

<footer>
  <p>© ${new Date().getFullYear()} ${data.name}. All Rights Reserved.</p>
</footer>

<script>
${scripts}
</script>

</body>
</html>
`;
};
