import express from "express";

const router = express.Router();

router.get("/");
router.get("/add");
router.get("/remove");

export default router;