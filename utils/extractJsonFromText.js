function stripHtmlTags(s) {
  return s.replace(/<[^>]*>/g, " ");
}

function findJsonSubstring(text) {
 
  const startIdx = text.search(/[\{\[]/);
  if (startIdx === -1) return null;
 
  for (let end = text.length; end > startIdx; end--) {
    const candidate = text.slice(startIdx, end);
    try {
      const parsed = JSON.parse(candidate);
      return parsed;
    } catch (e) {
     
    }
  }
  return null;
}

function extractJsonFromText(raw) {
  if (!raw || typeof raw !== "string") return null;
  const cleaned = stripHtmlTags(raw).trim();
 
  try {
    return JSON.parse(cleaned);
  } catch (e) {
    const parsed = findJsonSubstring(cleaned);
    return parsed;
  }
}

module.exports = extractJsonFromText;

