import { Router } from "express";
import {
  getAllFixtures,
  getLivescore,
  getPredictions,
  getStandings,
} from "../controllers/footballControllers.js";

const router = Router();


/** 
 * @swagger
 * tags:
 *   name: football
 *   description: Get fixtures, livescores, standings and top-players
*/


/**
 * @swagger
 * /api/v1/football/fixtures
 *   get:
 *     summary: Get all fixtures
 *     tags: [football]
 *     responses:
 *       200:
 *       description: Successfully fetched all fixtures
 *       400:
 *         description: bad request
 *       500: 
 *         description: server error  
 */

// get all fixtures for the day
router.get("/fixtures", getAllFixtures);

// get all predictions for a particular fixture
// router.get("/predictions/:fixture_id", getPredictions);

/**
 * @swagger
 * /api/v1/football/livescores
 *   get:
 *     summary: Get all livescores
 *     tags: [football]
 *     responses:
 *       200:
 *       description: Successfully fetched livescores
 * 
 *       500: 
 *         description: server error  
 */

// get live scores
router.get("/livescore", getLivescore);

/**
 * @swagger
 * /api/v1/football/fixtures
 *   get:
 *     summary: Get all fixtures
 *     tags: [football]
 *     responses:
 *       200:
 *       description: Successfully fetched all fixtures
 *       400:
 *         description: bad request
 *       500: 
 *         description: server error  
 */

// get standings
router.get("/standings", getStandings);
export default router;
