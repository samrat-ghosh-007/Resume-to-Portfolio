// const puppeteer = require("puppeteer-core");
// const { generateResumeHTML } = require("../templates/resume.template");

// exports.generatePDF = async (data) => {

//   const html = generateResumeHTML(data);

//   const browser = await puppeteer.launch({
//   channel: "chrome",
//   headless: true
// });


//   const page = await browser.newPage();
//   await page.setContent(html, { waitUntil: "networkidle0" });

//   const pdfBuffer = await page.pdf({
//     format: "A4",
//     printBackground: true
//   });

//   await browser.close();

//   return pdfBuffer;
// };



const puppeteer = require("puppeteer-core");
const path = require("path");
const fs = require("fs");
const { generateResumeHTML } = require("../templates/resume.template");

exports.generatePDF = async (data) => {

  const html = generateResumeHTML(data);

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

  return filePath; // return file path instead of buffer
};

