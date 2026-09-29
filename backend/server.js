import express from "express";
import jobsRoutes from "./routes/jobs.js";

const app = express();

app.use(express.json());

app.use("/api/jobs", jobsRoutes);

app.listen(3000);