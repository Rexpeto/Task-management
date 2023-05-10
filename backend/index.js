import express from "express";
import dotenv from "dotenv";
import connect from "./config/db.js";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

const app = express();
app.use(express.json());
dotenv.config();

connect();

const whiteList = ["http://192.168.1.105:5173"];

const corsOptions = {
    origin: function (origin, callback) {
        if (whiteList.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Error de Cors"));
        }
    },
};

app.use(cors(corsOptions));

//? Routing
app.use("/api/user", userRoutes);
app.use("/api/project", projectRoutes);
app.use("/api/task", taskRoutes);

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Servidor en el puerto ${port}`));
