import express from "express";

import {
  getTestimonials,
  getTestimonialById,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from "../controllers/testimonialsController.js";

const router = express.Router();

router.get("/", getTestimonials);
router.get("/:id", getTestimonialById);
router.post("/", createTestimonial);
router.put("/:id", updateTestimonial);
router.delete("/:id", deleteTestimonial);

export default router;