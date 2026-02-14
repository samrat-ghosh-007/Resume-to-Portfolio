exports.generateCoverLetterHTML = (content) => {
  return `
  <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          padding: 60px;
          line-height: 1.6;
        }
        h1 {
          text-align: center;
          margin-bottom: 40px;
        }
      </style>
    </head>
    <body>
      <h1>Cover Letter</h1>
      <div>${content.replace(/\n/g, "<br/>")}</div>
    </body>
  </html>
  `;
};
