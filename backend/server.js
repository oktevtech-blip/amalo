import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import settingsRoutes from "./routes/settingsRoutes.js";
import servicesRoutes from "./routes/servicesRoutes.js";
import projectsRoutes from "./routes/projectsRoutes.js";
import testimonialsRoutes from "./routes/testimonialsRoutes.js";
import statsRoutes from "./routes/statsRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.use("/api/settings", settingsRoutes);
app.use("/api/services", servicesRoutes);
app.use("/api/projects", projectsRoutes);
app.use("/api/testimonials", testimonialsRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/upload", uploadRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
    console.log(`Server running on port ${PORT}`)
);