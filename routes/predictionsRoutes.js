import express from "express";
import {
  createPredictions,
  deletePrediction,
  getAllPredictions,
  getPrediction,
  updatePrediction,
  getOdds,
} from "../controllers/predictionControllers.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Predictions
 *   description: serves odds (3rd party) to both admin and user, and also predictioncs crud
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     AdminPrediction:
 *       type: object
 *       required:
 *         - bet
 *         - fixture
 *       properties:
 *         id:
 *           type: string
 *         bet:
 *           type: number
 *         fixture:
 *           type: number
 *         user_id:
 *           type: string
 *         bets:
 *           type: array
 *           items:
 *             type: object
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *       example:
 *         bet: 100
 *         fixture: 223344
 */

/**
 * @swagger
 * /api/v1/admin/predictions/odds:
 *   get:
 *     summary: Fetch betting odds for a fixture or odds type
 *     description: >
 *       - Admin: provide **fixture** to fetch odds for a specific fixture
 *       - Users: provide **betId** (e.g., free_tips_id, sure_odds) to fetch odds for the day
 *       If betId is >= 100, admin-saved predictions for today are returned.
 *     tags: [Predictions]
 *     parameters:
 *       - in: query
 *         name: fixture
 *         schema:
 *           type: number
 *         required: false
 *         description: Fixture ID (admin odds lookup)
 *       - in: query
 *         name: bet
 *         schema:
 *           type: number
 *         required: false
 *         description: Bet/odds category ID (user odds lookup)
 *     responses:
 *       200:
 *         description: Odds or admin predictions returned successfully
 *       400:
 *         description: Missing fixture or betId
 *       500:
 *         description: Server error
 */
router.get("/odds", getOdds);

/**
 * @swagger
 * /api/v1/admin/predictions:
 *   post:
 *     summary: Create a new admin prediction
 *     tags: [Predictions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bet:
 *                 type: number
 *               fixture:
 *                 type: number
 *             example:
 *               bet: 100
 *               fixture: 12345
 *     responses:
 *       201:
 *         description: Prediction created successfully
 *       400:
 *         description: Missing bet or data
 *       500:
 *         description: Server error
 */
router.post("/", authMiddleware, createPredictions);

/**
 * @swagger
 * /api/v1/admin/predictions:
 *   get:
 *     summary: Get all predictions created by the authenticated admin
 *     tags: [Predictions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of admin predictions
 *       500:
 *         description: Server error
 */
router.get("/", authMiddleware, getAllPredictions);

/**
 * @swagger
 * /api/v1/admin/predictions/single:
 *   post:
 *     summary: Get a specific prediction by ID
 *     tags: [Predictions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               prediction_id:
 *                 type: string
 *             example:
 *               prediction_id: "671612b7d3c53c6f246a8c12"
 *     responses:
 *       200:
 *         description: Prediction retrieved successfully
 *       400:
 *         description: prediction_id missing
 *       500:
 *         description: Server error
 */
router.post("/single", authMiddleware, getPrediction);

/**
 * @swagger
 * /api/v1/admin/predictions/{id}:
 *   put:
 *     summary: Update an existing prediction
 *     tags: [Predictions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AdminPrediction'
 *     responses:
 *       200:
 *         description: Prediction updated successfully
 *       404:
 *         description: Prediction not found
 *       500:
 *         description: Server error
 */
router.put("/:id", authMiddleware, updatePrediction);

/**
 * @swagger
 * /api/v1/admin/predictions/{id}:
 *   delete:
 *     summary: Delete a prediction
 *     tags: [Predictions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Prediction deleted successfully
 *       404:
 *         description: Prediction not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", authMiddleware, deletePrediction);

export default router;
