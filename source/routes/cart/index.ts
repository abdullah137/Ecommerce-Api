import express from "express";

const router = express.Router();

// TODO 1). Input Some Middleware For Auth Here

router.post("/add-to-cart");
router.get("/view-cart");
router.patch("/edit-cart");
router.delete("/delete-cart");
router.post("/remove-cart");

export default router;