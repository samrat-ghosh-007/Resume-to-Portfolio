const pdfParse = require("pdf-parse");

exports.extractText = async (fileBuffer) => {
  const data = await pdfParse(fileBuffer);
  return data.text;
};
