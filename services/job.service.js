const axios = require("axios");

const fetchJobs = async (skills) => {
  const query = skills.slice(0, 2).join(" ");


  const response = await axios.get(
    `https://api.adzuna.com/v1/api/jobs/in/search/1`,
    {
      params: {
        app_id: process.env.ADZUNA_APP_ID,
        app_key: process.env.ADZUNA_APP_KEY,
        results_per_page: 10,
        what: query
      },
      headers: {
        Accept: "application/json"
      }
    }
  );

  return response.data.results.map(job => ({
    title: job.title,
    company: job.company.display_name,
    location: job.location.display_name,
    redirectUrl: job.redirect_url
  }));
};

module.exports = fetchJobs;
