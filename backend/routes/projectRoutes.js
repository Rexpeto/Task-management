import express from "express";
import checkAuth from "../middleware/checkAuth.js";
import {
    addCollaborators,
    deleteCollaborators,
    deleteProject,
    editProject,
    getProject,
    getProjects,
    getTask,
    newProject,
} from "../controllers/projectController.js";

const router = express.Router();

router.route("/").get(checkAuth, getProjects).post(checkAuth, newProject);

router
    .route("/:id")
    .get(checkAuth, getProject)
    .put(checkAuth, editProject)
    .delete(checkAuth, deleteProject);

router.get("/task/:id", checkAuth, getTask);

router.post("/add-collaborators/:id", checkAuth, addCollaborators);

router.post("/delete-collaborators/:id", checkAuth, deleteCollaborators);

export default router;
