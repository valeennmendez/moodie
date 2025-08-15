import express from "express";
import {
  addPreferencesController,
  getPreferencesController,
} from "../controllers/profile.controllers.js";
import { protectedRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/add-preferences", protectedRoute, addPreferencesController);
router.get("/get-preferences", protectedRoute, getPreferencesController);

export default router;
