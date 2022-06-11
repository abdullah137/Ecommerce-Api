import express from "express";
import controller from "../controllers/index";

const router = express.Router();

router.get("/", controller.homePage);
router.get("/about", controller.aboutPage);
router.get("/contact", controller.contactPage);

export default router;