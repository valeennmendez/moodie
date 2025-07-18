import express from "express";
import { recommendation } from "../controllers/movie.controllers.js";

const router = express.Router();

router.post("/recommendation", recommendation);

export default router;
