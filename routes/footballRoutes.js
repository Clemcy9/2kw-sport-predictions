import { Router } from "express";
import {
  getAllFixtures,
  getLivescore,
  getPredictions,
  getStandings,
  getTopPlayer,
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
 * /api/v1/football/fixtures:
 *   get:
 *     summary: Get all fixtures
 *     tags: [football]
 *     parameters:
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *         description: date(e.g, 2025-11-01)
 *     responses:
 *       200:
 *         description: Successfully fetched all fixtures
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
 * /api/v1/football/livescores:
 *   get:
 *     summary: Get all livescores
 *     tags: [football]
 *     responses:
 *       200:
 *         description: Successfully fetched livescores
 *       500:
 *         description: server error
 */

// get live scores
router.get("/livescores", getLivescore);

/**
 * @swagger
 * /api/v1/football/standings:
 *   get:
 *     summary: Get all fixtures
 *     tags: [football]
 *     parameters:
 *       - in: query
 *         name: league
 *         schema:
 *           type: number
 *         required: true
 *         description: league ID
 *       - in: query
 *         name: season
 *         schema:
 *           type: number
 *           required: true
 *           description: season(e.g 2025)
 *     responses:
 *       200:
 *         description: Successfully fetched standings
 *       400:
 *         description: bad request
 *       500:
 *         description: server error
 */
// get standings
router.get("/standings", getStandings);

/**
 * @swagger
 * /api/v1/football/topscorers:
 *   get:
 *     summary: Get all fixtures
 *     tags: [football]
 *     parameters:
 *       - in: query
 *         name: league
 *         schema:
 *           type: number
 *         required: true
 *         description: league ID
 *       - in: query
 *         name: season
 *         schema:
 *           type: number
 *           required: true
 *           description: season(e.g 2025)
 *     responses:
 *       200:
 *         description: Successfully fetched standings
 *       400:
 *         description: bad request
 *       500:
 *         description: server error
 */
// get topscorers
router.get("/topscorers", getTopPlayer);

export default router;
