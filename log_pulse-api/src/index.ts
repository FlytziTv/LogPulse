import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import projectsRoutes from "./routes/projects.routes";
import logsRoutes from "./routes/logs.routes";

dotenv.config();

const app = express();
const PORT = process.env["PORT"] || 4000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectsRoutes);
app.use("/api/logs", logsRoutes);

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
