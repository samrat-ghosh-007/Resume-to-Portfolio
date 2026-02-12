const axios = require("axios");

exports.deploy = async (htmlCode) => {
  const response = await axios.post(
    "https://api.vercel.com/v13/deployments",
    {
      name: `portfolio-${Date.now()}`,
      files: [
        {
          file: "index.html",
          data: htmlCode
        }
      ],
      projectSettings: {
        framework: null
      }
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.VERCEL_TOKEN}`,
        "Content-Type": "application/json"
      }
    }
  );

  return response.data.url;
};
