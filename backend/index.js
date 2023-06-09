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

const whiteList = [process.env.FRONTEND_URL];

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

const server = app.listen(port, () =>
    console.log(`Servidor en el puerto ${port}`)
);

//? Socket.io
import { Server } from "socket.io";

const io = new Server(server, {
    pingTimeout: 60000,
    cors: {
        origin: process.env.FRONTEND_URL,
    },
});

io.on("connection", (socket) => {
    console.log("Conectado por socket");

    //* Events
    socket.on("open project", (project) => {
        socket.join(project);
    });

    socket.on("new task", (task) => {
        socket.to(task.project).emit("add task", task);
    });

    socket.on("delete task", (task) => {
        const project = task.project;
        socket.to(project._id).emit("deleted task", task);
    });

    socket.on("edit task", (task) => {
        const project = task.project._id;
        socket.to(project).emit("editing task", task);
    });

    socket.on("change status", (task) => {
        const project = task.project._id;
        socket.to(project).emit("changing status", task);
    });
});
