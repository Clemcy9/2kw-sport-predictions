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
 *       - Users: provide **bet** (e.g., free_tips_id, sure_odds) to fetch odds for the day
 *       - If bet >= 100, admin-saved predictions for the given date are returned.
 *       - Users can optionally provide **odd_date** in `YYYY-MM-DD` format to fetch odds for a specific date. Defaults to today.
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
 *       - in: query
 *         name: market_name
 *         schema:
 *           type: string
 *         required: false
 *         description: Market name (e.g., home, over 1.5) to distinguish composite responses
 *       - in: query
 *         name: odd_date
 *         schema:
 *           type: string
 *           format: date
 *         required: false
 *         description: Optional date in `YYYY-MM-DD` format to fetch odds for a specific day (defaults to today)
 *     responses:
 *       200:
 *         description: Odds or admin predictions returned successfully
 *       400:
 *         description: Missing fixture or bet
 *       500:
 *         description: Server error
 */

router.get("/odds", getOdds);
/**
 * @swagger
 * /api/v1/admin/predictions:
 *   post:
 *     summary: Create admin predictions
 *     description: >
 *       Authenticated endpoint. Creates one or more admin predictions.
 *       The payload must be an array of prediction objects, each containing
 *       a fixture_id, bet_type, and its associated bets.
 *     tags: [Predictions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             minItems: 1
 *             description: Array of admin predictions
 *             items:
 *               type: object
 *               required:
 *                 - fixture_id
 *                 - bet_type
 *                 - bet_type_id
 *                 - bets
 *               properties:
 *                 fixture_id:
 *                   type: string
 *                   description: The ID of the fixture
 *                   example: "1339243"
 *                 bet_type_id:
 *                   type: number
 *                   description: Admin prediction category/type id
 *                   example: 100
 *                 bet_type:
 *                   type: string
 *                   description: Admin prediction category/type
 *                   example: "super_single"
 *                   enum:
 *                     - super_single
 *                     - freeTwoOdds
 *                     - free_tips
 *                     - sure_bankerd
 *                 bets:
 *                   type: array
 *                   description: Array of bets selected by admin
 *                   items:
 *                     type: object
 *                     required:
 *                       - id
 *                       - name
 *                       - values
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: Bet ID
 *                         example: 1
 *                       name:
 *                         type: string
 *                         description: Bet name
 *                         example: "Match Winner"
 *                       values:
 *                         type: array
 *                         description: Chosen values for the bet
 *                         items:
 *                           type: object
 *                           required:
 *                             - value
 *                             - odd
 *                             - percentage
 *                           properties:
 *                             value:
 *                               type: string
 *                               description: Selected value
 *                               example: "Home"
 *                             odd:
 *                               type: string
 *                               description: Odd for this value
 *                               example: "1.49"
 *                             percentage:
 *                               type: string
 *                               description: Probability percentage
 *                               example: "67.11"
 *     responses:
 *       201:
 *         description: Predictions created successfully
 *       400:
 *         description: Invalid input (missing or malformed payload)
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
 * /api/v1/admin/predictions/{id}:
 *   get:
 *     summary: Get a specific prediction by ID
 *     tags: [Predictions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: prediction ID
 *     responses:
 *       200:
 *         description: prediction found successfully
 *       404:
 *         description: prediction not found
 *       500:
 *         description: Server error
 */
router.get("/:id", authMiddleware, getPrediction);

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
