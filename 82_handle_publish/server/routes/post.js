import express from "express";
const router = express.Router();

// middleware
import { requireSignin, isAdmin } from "../middlewares";
// controllers
import { uploadImage } from "../controllers/post";

router.post("/upload-image", requireSignin, isAdmin, uploadImage);

export default router;
