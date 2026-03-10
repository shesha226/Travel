import express from "express";
import { createExperience, getAllExperiences, getExperienceById, getExperienceByTitle, updatedExperience, deleteExperience } from "../controller/experienceController.js";
import { authenticate } from "../middlweare/authMiddleware.js";

const router = express.Router();

router.post("/", authenticate, createExperience);
router.get("/", getAllExperiences);
router.get("/title/:title", getExperienceByTitle);
router.get("/:id", getExperienceById);
router.put("/:id", authenticate, updatedExperience);
router.delete("/:id", authenticate, deleteExperience);

export default router;