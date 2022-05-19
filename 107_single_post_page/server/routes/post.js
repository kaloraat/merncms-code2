import express from "express";
import formidable from "express-formidable";
const router = express.Router();

// middleware
import { requireSignin, isAdmin } from "../middlewares";
// controllers
import {
  uploadImage,
  createPost,
  posts,
  uploadImageFile,
  media,
  removeMedia,
  singlePost,
} from "../controllers/post";

router.post("/upload-image", requireSignin, isAdmin, uploadImage);
router.post(
  "/upload-image-file",
  formidable(),
  requireSignin,
  isAdmin,
  uploadImageFile
);
router.post("/create-post", requireSignin, isAdmin, createPost);
router.get("/posts", posts);
router.get("/post/:slug", singlePost);
// media
router.get("/media", requireSignin, isAdmin, media);
router.delete("/media/:id", requireSignin, isAdmin, removeMedia);

export default router;
