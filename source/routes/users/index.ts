import express from "express";
const router = express.Router();

// Importing middlware for validation
import { RegistrationSchema, LoginSchema, validateUser } from "../../middleware/validation/user";

import extractJwt from "../../middleware/authentication/get-jwt-token";

// Controller Imports
import controller from "../../controllers/users/index";

// Login Routes
router.post("/login", validateUser(LoginSchema.data), controller.login);

// For Signup
router.post("/signup", validateUser(RegistrationSchema.data), controller.registerUser);

// For Logout
router.delete("/logout", extractJwt, controller.logoutUser);

// Get All Users Or Customers
router.get("/customers", extractJwt, controller.getAllUsers);


export default router;