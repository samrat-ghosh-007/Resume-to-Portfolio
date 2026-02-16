require("dotenv").config();
const express = require("express");
const cors = require("cors");
const generateRoute = require("./routes/generate.route");
const jobRoutes = require("./routes/job.route");
const resumeRoutes = require("./routes/resume.route");
const analyzeRoutes = require("./routes/analyze.route");
const coverRoute = require("./routes/cover.route");




const app = express();



app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT","PATCH", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use("/api/generate", generateRoute);
app.use("/api/jobs", jobRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/analyze", analyzeRoutes);
app.use("/api", coverRoute);


app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
