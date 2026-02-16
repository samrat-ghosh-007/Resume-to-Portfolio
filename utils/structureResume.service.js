exports.structureResume = (rawText) => {
  const lines = rawText
    .split("\n")
    .map(l => l.trim())
    .filter(l => l.length > 0);

  let structured = "";
  let section = "";
  let insideProject = false;

  const isYearLine = (line) =>
    /\b(19|20)\d{2}\b/.test(line);

  const isDuration = (line) =>
    /\b(19|20)\d{2}\b/.test(line) && line.includes("-");

  const isAllCaps = (line) =>
    line === line.toUpperCase();

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    
    if (i === 0) {
      structured += `NAME: ${line}\n\n`;
      continue;
    }

    
    if (line.includes("+") || line.includes("linkedin") || line.includes("github")) {
      if (!structured.includes("CONTACT:")) {
        structured += "CONTACT:\n";
      }

      const parts = line.split("|").map(p => p.trim());

      parts.forEach(part => {
        if (part.includes("+")) structured += `Phone: ${part}\n`;
        else if (part.toLowerCase().includes("linkedin")) structured += `LinkedIn: ${part}\n`;
        else if (part.toLowerCase().includes("github")) structured += `GitHub: ${part}\n`;
      });

      structured += "\n";
      continue;
    }

    
    if (isAllCaps(line) && line.includes("SUMMARY")) {
      section = "SUMMARY";
      structured += "PROFESSIONAL_SUMMARY:\n";
      continue;
    }

    if (isAllCaps(line) && line.includes("SKILLS")) {
      section = "SKILLS";
      structured += "\nSKILLS:\n";
      continue;
    }

    if (isAllCaps(line) && line.includes("EXPERIENCE")) {
      section = "EXPERIENCE";
      structured += "\nEXPERIENCE:\n";
      continue;
    }

    if (isAllCaps(line) && line.includes("PROJECT")) {
      section = "PROJECT";
      structured += "\nPROJECTS:\n";
      continue;
    }

    if (isAllCaps(line) && line.includes("EDUCATION")) {
      section = "EDUCATION";
      structured += "\nEDUCATION:\n";
      continue;
    }

   

    if (section === "SUMMARY") {
      structured += `${line}\n`;
      continue;
    }

    if (section === "SKILLS") {
      const skills = line.split(",");
      skills.forEach(skill => {
        structured += `- ${skill.trim()}\n`;
      });
      continue;
    }

    if (section === "EXPERIENCE") {
     
      if (line.includes(" - ") && !isDuration(line)) {
        structured += `\nROLE: ${line}\n`;
      }
      
      else if (isDuration(line)) {
        structured += `DURATION: ${line}\n`;
      }
      
      else {
        structured += `- ${line}\n`;
      }
      continue;
    }

    if (section === "PROJECT") {
      
      if (!line.startsWith("-") && line.length < 60 && !line.includes("using")) {
        structured += `\nNAME: ${line}\nDESCRIPTION:\n`;
        insideProject = true;
      } else {
        structured += `- ${line}\n`;
      }
      continue;
    }

    if (section === "EDUCATION") {
      if (isYearLine(line)) {
        structured += `Year: ${line}\n`;
      } else {
        structured += `${line}\n`;
      }
      continue;
    }
  }

  return structured;
};
