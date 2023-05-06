import express from "express";
import dotenv from "dotenv";
import connect from "./config/db.js";

const app = express();
dotenv.config();

connect();

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Servidor en el puerto ${port}`));
