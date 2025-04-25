import express from "express";
import {
  addHeroSection,
  updateHeroSection,
  getHeroSection,
} from "../controllers/HeroSection.controller.js";
import upload from "../config/multer.js";

const router = express.Router();

router.post("/add", upload.single("file"), addHeroSection); // Ensure 'file' matches the client-side field name
router.put("/update/:heroid",upload.single("file"), updateHeroSection);
router.get("/", getHeroSection);

export default router;
