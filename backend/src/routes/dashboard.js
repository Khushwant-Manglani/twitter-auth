import express from "express";
import verifyToken from "../middleware/auth.js";
import dashboardController from "../controllers/dashboard.js";

const router = express.Router();

// GET - dashboard
router.get('/', verifyToken, dashboardController);

export default router;