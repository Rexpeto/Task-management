import express from "express";
import checkAuth from "../middleware/checkAuth.js";
import { getProject, getProjects } from "../controllers/projectController.js";

const router = express.Router();

router.get("/", checkAuth, getProjects);

export default router;
