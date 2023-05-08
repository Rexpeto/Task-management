import express from "express";
import {
    register,
    authAccount,
    confirmEmail,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/", register);
router.post("/login", authAccount);
router.get("/confirm/:token", confirmEmail);

export default router;
