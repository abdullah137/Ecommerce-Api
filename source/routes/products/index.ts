import express from "express";
const router = express.Router();

// Importing middleware for validation
import { ProductSchema, validateProduct } from "../../middleware/validation/product";

// Imports controllers Here
import controller from "../../controllers/products/index";

// Get all controller
router.get("/",  controller.getAllProduct);

// Add Products
router.post("/", validateProduct(ProductSchema.data), controller.addProducts );

export default router;