import express from "express";

import {
  getStats,
  updateStat,
} from "../controllers/statsController.js";

const router = express.Router();

router.get("/", getStats);
router.put("/:id", updateStat);

export default router;