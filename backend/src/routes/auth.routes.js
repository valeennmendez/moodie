import express from "express";
import {
  loginController,
  signupController,
  logoutController,
  verificationController,
  resendEmailController,
} from "../controllers/auth.controllers.js";

const router = express.Router();

router.post("/login", loginController);
router.post("/signup", signupController);
router.post("/logout", logoutController);
router.post("/verification", verificationController);
router.post("/resend-email", resendEmailController);

export default router;
