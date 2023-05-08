import express from "express";
import {
    register,
    authAccount,
    confirmEmail,
    forgotPassword,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/", register);
router.post("/login", authAccount);
router.get("/confirm/:token", confirmEmail);
router.post("/forgotPass", forgotPassword);

export default router;
