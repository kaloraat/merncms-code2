const express = require("express");

const router = express.Router();

// middleware
import { requireSignin, isAdmin, isAuthor } from "../middlewares";
// controllers
const {
  signup,
  signin,
  forgotPassword,
  resetPassword,
  currentUser,
  createUser,
} = require("../controllers/auth");

router.get("/", (req, res) => {
  return res.json({
    data: "hello world from kaloraat auth API",
  });
});
router.post("/signup", signup);
router.post("/signin", signin);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.get("/current-admin", requireSignin, isAdmin, currentUser);
router.get("/current-author", requireSignin, isAuthor, currentUser);
router.get("/current-subscriber", requireSignin, currentUser);
// create-user
router.post("/create-user", requireSignin, isAdmin, createUser);

module.exports = router;
