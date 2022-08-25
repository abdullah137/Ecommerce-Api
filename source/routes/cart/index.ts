import express from "express";

const router = express.Router();

// TODO 1). Input Some Middleware For Auth Here

// Import middleware for validation
import { validateCart, ProductSchema } from "../../middleware/validation/cart";

// Import Controller Here
import controller from "../../controllers/cart/index";

router.post("/", validateCart(ProductSchema.data), controller.addToCart);

router.get("/view-cart");

router.patch("/edit-cart");

router.delete("/delete-cart");

router.post("/remove-cart");

export default router;