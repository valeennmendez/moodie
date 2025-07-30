import express from "express";
import {
  loginController,
  signupController,
  logoutController,
  verificationController,
} from "../controllers/auth.controllers.js";

const router = express.Router();

router.post("/login", loginController);
router.post("/signup", signupController);
router.post("/logout", logoutController);
router.post("/verification", verificationController);

export default router;
