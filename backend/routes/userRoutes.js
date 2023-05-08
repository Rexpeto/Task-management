import express from "express";
import {
    register,
    authAccount,
    confirmEmail,
    forgotPassword,
    checkTokenPass,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/", register);
router.post("/login", authAccount);
router.get("/confirm/:token", confirmEmail);
router.post("/forgotPass", forgotPassword);
router.post("/checkPass/:token", checkTokenPass);

export default router;
