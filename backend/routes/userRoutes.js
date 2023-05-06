import express from "express";
import { userExample } from "../controllers/userController.js";

const router = express.Router();

router.get("/", userExample);

export default router;
