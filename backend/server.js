import express from "express";
import jobsRoutes from "./routes/jobs.js";
import cors from "cors"

const app = express();

app.use(cors({
    origin: "http://localhost:5173"
}))
app.use(express.json());

app.use("/api/jobs", jobsRoutes);

app.listen(3000);