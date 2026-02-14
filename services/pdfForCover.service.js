const puppeteer = require("puppeteer-core");
const path = require("path");
const fs = require("fs");
const { generateCoverLetterHTML } = require("../templates/cover.template");

exports.generatePDFBuffer = async (data) => {

  const html = generateCoverLetterHTML(data);

  const browser = await puppeteer.launch({
    executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle0" });

  const fileName = `resume-${Date.now()}.pdf`;
  const filePath = path.join(__dirname, "../../", fileName);

  await page.pdf({
    path: filePath,
    format: "A4",
    printBackground: true
  });

  await browser.close();

  return filePath; 
};


