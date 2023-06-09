import express from "express";
import checkAuth from "../middleware/checkAuth.js";
import {
    addTask,
    changeStatus,
    deleteTask,
    getTask,
    updateTask,
} from "../controllers/taskController.js";

const router = express.Router();

router.post("/", checkAuth, addTask);
router
    .route("/:id")
    .get(checkAuth, getTask)
    .put(checkAuth, updateTask)
    .post(checkAuth, deleteTask);
router.post("/status/:id", checkAuth, changeStatus);

export default router;
