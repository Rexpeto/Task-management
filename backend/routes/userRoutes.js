import express from "express";
import {
    register,
    authAccount,
    confirmEmail,
    forgotPassword,
    checkTokenPass,
    resetPassword,
    perfil,
} from "../controllers/userController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.post("/", register);
router.post("/login", authAccount);
router.get("/confirm/:token", confirmEmail);
router.post("/forgotPass", forgotPassword);
router.get("/checkPass/:token", checkTokenPass);
router.post("/resetPass/:token", resetPassword);
router.get("/perfil", checkAuth, perfil);

export default router;
