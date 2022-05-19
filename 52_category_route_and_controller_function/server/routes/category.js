import express from "express";
const router = express.Router();

// controllers
import { create } from "../controllers/category";

router.post("/category", create);

export default router;
