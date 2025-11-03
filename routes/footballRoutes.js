import { Router } from "express";
import {
  getAllFixtures,
  getLivescore,
  getPredictions,
  getStandings,
} from "../controllers/footballControllers.js";

const router = Router();

// get all fixtures for the day
router.get("/fixtures", getAllFixtures);

// get all predictions for a particular fixture
router.get("/predictions/:fixture_id", getPredictions);

// get live scores
router.get("/livescore", getLivescore);

// get standings
router.get("/standings", getStandings);
export default router;
