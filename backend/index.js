import express from "express";
import dotenv from "dotenv";
import connect from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

const app = express();
app.use(express.json());
dotenv.config();

connect();

//? Routing
app.use("/api/user", userRoutes);
app.use("/api/project", projectRoutes);
app.use("/api/task", taskRoutes);

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Servidor en el puerto ${port}`));
