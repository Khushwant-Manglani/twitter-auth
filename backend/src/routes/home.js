import express from "express";
import verifyToken from "../middleware/auth.js";
import homeController from "../controllers/home.js";

const router = express.Router();

// GET - home 
router.get('/', verifyToken, homeController);

export default router;