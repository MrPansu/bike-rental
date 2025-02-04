import express from "express";

import {
  getAllBikes,
  createBike,
  getBikeById,
  deleteBikeById,
  updateBikeById,
} from "../controllers/bike.controller.js";

const router = express.Router();

router.get("/", getAllBikes);
router.get("/:id", getBikeById);
router.post("/", createBike);
router.delete("/:id", deleteBikeById);
router.put("/:id", updateBikeById);

export default router;
