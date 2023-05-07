import express from "express";
import { register, authAccount } from "../controllers/userController.js";

const router = express.Router();

router.post("/", register);
router.post("/login", authAccount);

export default router;
