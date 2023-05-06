import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    res.send("Hi user");
});

export default router;
