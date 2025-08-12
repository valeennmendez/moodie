import express from "express";
import {
  loginController,
  signupController,
  logoutController,
  verificationController,
  resendEmailController,
  checkController,
} from "../controllers/auth.controllers.js";
import { protectedRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/login", loginController);
router.post("/signup", signupController);
router.get("/logout", logoutController);
router.post("/verification", verificationController);
router.post("/resend-email", resendEmailController);

router.get("/check", protectedRoute, checkController);

export default router;
