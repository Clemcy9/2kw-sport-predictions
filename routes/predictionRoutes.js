import express from "express"
import { createPrediction, getPrediction, getPedictionId, updatePrediction, deletePrediction } from "../controllers/predictionControllers.js"

const router = express.Router()
router.post("/", createPrediction)
router.get("/", getPrediction)
router.get("/:id", getPedictionId)
router.put("/:id", updatePrediction)
router.delete("/:id", deletePrediction)

export default router