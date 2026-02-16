exports.parseResumeText = (text) => {
  if (!text || typeof text !== "string") {
    return null;
  }

  const lines = text
    .split("\n")
    .map(line => line.trim())
    .filter(line => line.length > 0);

  const data = {
    name: "",
    contact: {
      phone: "",
      linkedin: "",
      github: ""
    },
    summary: "",
    skills: [],
    experience: [],
    projects: [],
    education: ""
  };

  let currentSection = "header";
  let currentExperience = null;
  let currentProject = null;

  for (let line of lines) {

    // =============================
    // SECTION DETECTION
    // =============================

    if (line === "CONTACT:") {
      currentSection = "contact";
      continue;
    }

    if (line === "PROFESSIONAL_SUMMARY:") {
      currentSection = "summary";
      continue;
    }

    if (line === "SKILLS:") {
      currentSection = "skills";
      continue;
    }

    if (line === "EXPERIENCE:") {
      // push unfinished project if exists
      if (currentProject) {
        data.projects.push(currentProject);
        currentProject = null;
      }

      currentSection = "experience";
      continue;
    }

    if (line === "PROJECTS:") {
      // push unfinished experience if exists
      if (currentExperience) {
        data.experience.push(currentExperience);
        currentExperience = null;
      }

      currentSection = "projects";
      continue;
    }

    if (line === "EDUCATION:") {
      // push any pending objects
      if (currentExperience) {
        data.experience.push(currentExperience);
        currentExperience = null;
      }

      if (currentProject) {
        data.projects.push(currentProject);
        currentProject = null;
      }

      currentSection = "education";
      continue;
    }

    // =============================
    // HEADER (NAME)
    // =============================

    if (currentSection === "header" && line.startsWith("NAME:")) {
      data.name = line.replace("NAME:", "").trim();
      continue;
    }

    // =============================
    // CONTACT
    // =============================

    if (currentSection === "contact") {
      if (line.startsWith("Phone:")) {
        data.contact.phone = line.replace("Phone:", "").trim();
        continue;
      }

      if (line.startsWith("LinkedIn:")) {
        data.contact.linkedin = line.replace("LinkedIn:", "").trim();
        continue;
      }

      if (line.startsWith("GitHub:")) {
        data.contact.github = line.replace("GitHub:", "").trim();
        continue;
      }
    }

    // =============================
    // SUMMARY
    // =============================

    if (currentSection === "summary") {
      data.summary += line + " ";
      continue;
    }

    // =============================
    // SKILLS
    // =============================

    if (currentSection === "skills" && line.startsWith("-")) {
      data.skills.push(line.replace("-", "").trim());
      continue;
    }

    // =============================
    // EXPERIENCE
    // =============================

    if (currentSection === "experience") {

      if (line.startsWith("ROLE:")) {
        // save previous job
        if (currentExperience) {
          data.experience.push(currentExperience);
        }

        currentExperience = {
          role: line.replace("ROLE:", "").trim(),
          duration: "",
          responsibilities: []
        };

        continue;
      }

      if (line.startsWith("DURATION:") && currentExperience) {
        currentExperience.duration = line.replace("DURATION:", "").trim();
        continue;
      }

      if (line.startsWith("-") && currentExperience) {
        currentExperience.responsibilities.push(
          line.replace("-", "").trim()
        );
        continue;
      }
    }

    // =============================
    // PROJECTS
    // =============================

    if (currentSection === "projects") {

      if (line.startsWith("NAME:")) {
        // save previous project
        if (currentProject) {
          data.projects.push(currentProject);
        }

        currentProject = {
          name: line.replace("NAME:", "").trim(),
          description: []
        };

        continue;
      }

      if (line.startsWith("-") && currentProject) {
        currentProject.description.push(
          line.replace("-", "").trim()
        );
        continue;
      }
    }

    // =============================
    // EDUCATION
    // =============================

    if (currentSection === "education") {
      data.education += line + " ";
      continue;
    }
  }

  // =============================
  // PUSH REMAINING OBJECTS
  // =============================

  if (currentExperience) {
    data.experience.push(currentExperience);
  }

  if (currentProject) {
    data.projects.push(currentProject);
  }

  // Final cleanup
  data.summary = data.summary.trim();
  data.education = data.education.trim();

  return data;
};
