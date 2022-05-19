import express from "express";
const router = express.Router();

// middleware
import { requireSignin } from "../middlewares";
// controllers
import { create } from "../controllers/category";

router.post("/category", requireSignin, create);

export default router;
