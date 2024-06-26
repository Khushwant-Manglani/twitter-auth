import express from "express";
import signupController from "../controllers/signup.js";
import loginController from "../controllers/login.js";

const router = express.Router();

// POST - signup and login
router.post('/signup', signupController);
router.post('/login', loginController);

export default router;