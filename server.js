require("dotenv").config();
const express = require("express");
const generateRoute = require("./routes/generate.route");
const jobRoutes = require("./routes/job.route");

const app = express();

app.use(express.json());
app.use("/api/generate", generateRoute);
app.use("/api/jobs", jobRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
