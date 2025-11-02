import { Router } from "express";
import { getAllFixtures } from "../controllers/adminControllers.js";
import ApprovedPrediction from "../models/predictionsModel.js";
import { getCached, setCached } from "../services/cache.service.js";
import { fetchFixtures } from "../services/thirdparty.service.js";

const router = Router();

// get all fixtures for the day
router.get("/fixtures", getAllFixtures);

// get all predictions for a particular

//

export default router;
