import express from "express";
import checkAuth from "../middleware/checkAuth.js";
import {
    addCollaborators,
    deleteCollaborators,
    deleteProject,
    editProject,
    getProject,
    getProjects,
    newProject,
    searchCollaborators,
} from "../controllers/projectController.js";

const router = express.Router();

router.route("/").get(checkAuth, getProjects).post(checkAuth, newProject);

router
    .route("/:id")
    .get(checkAuth, getProject)
    .put(checkAuth, editProject)
    .post(checkAuth, deleteProject);

router.post("/add-collaborators/:id", checkAuth, addCollaborators);

router.post("/delete-collaborators/:id", checkAuth, deleteCollaborators);

router.post("/search-collaborators/:id", checkAuth, searchCollaborators);

export default router;
