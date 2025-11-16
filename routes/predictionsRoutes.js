import express from "express";
import {
  createPredictions,
  deletePrediction,
} from "../controllers/predictionControllers.js";
import authMiddleware from "../middleware/authMiddleware.js";
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Predictions
 *   description: prediction for matches
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Prediction:
 *       type: object
 *       required:
 *         - match_id
 *         - user_id
 *         - predicted_winner
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated ID of the prediction
 *         match_id:
 *           type: string
 *           description: ID of the match the prediction belongs to
 *         user_id:
 *           type: string
 *           description: ID of the user who made the prediction
 *         predicted_winner:
 *           type: string
 *           description: The predicted winner of the match
 *         confidence_level:
 *           type: number
 *           description: Confidence percentage (0–100)
 *           example: 85
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *       example:
 *         id: "671612b7d3c53c6f246a8c12"
 *         match_id: "671611a4d3c53c6f246a8b90"
 *         user_id: "67160fa2d3c53c6f246a8a83"
 *         predicted_winner: "Lions FC"
 *         confidence_level: 90
 *         createdAt: "2025-10-21T10:30:00Z"
 *         updatedAt: "2025-10-21T10:45:00Z"
 */

/**
 * @swagger
 * /api/predictions:
 *   post:
 *     summary: Create a new prediction
 *     tags: [Predictions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Prediction'
 *     responses:
 *       200:
 *         description: Prediction created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: prediction added successfully
 *                 data:
 *                   $ref: '#/components/schemas/Prediction'
 *       500:
 *         description: Server error or prediction creation failed
 */
router.post("/", authMiddleware, createPredictions);

// /**
//  * @swagger
//  * /api/predictions:
//  *   get:
//  *     summary: Retrieve all predictions (optionally filtered)
//  *     tags: [Predictions]
//  *     parameters:
//  *       - in: query
//  *         name: matchId
//  *         schema:
//  *           type: string
//  *         required: false
//  *         description: Filter predictions by match ID
//  *       - in: query
//  *         name: date
//  *         schema:
//  *           type: string
//  *           format: date
//  *         required: false
//  *         description: Filter predictions created on or after this date
//  *     responses:
//  *       200:
//  *         description: Successfully retrieved predictions
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 success:
//  *                   type: boolean
//  *                   example: true
//  *                 data:
//  *                   type: array
//  *                   items:
//  *                     $ref: '#/components/schemas/Prediction'
//  *       404:
//  *         description: No predictions found
//  *       500:
//  *         description: Internal server error
//  */
// router.get("/", getPrediction);

// /**
//  * @swagger
//  * /api/predictions/{id}:
//  *   get:
//  *     summary: Retrieve a single prediction by ID
//  *     tags: [Predictions]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: Prediction ID
//  *     responses:
//  *       200:
//  *         description: Prediction retrieved successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 success:
//  *                   type: boolean
//  *                   example: true
//  *                 message:
//  *                   type: string
//  *                   example: prediction gotten successfully
//  *                 data:
//  *                   $ref: '#/components/schemas/Prediction'
//  *       404:
//  *         description: Prediction not found
//  *       500:
//  *         description: Internal server error
//  */
// router.get("/:id", getPedictionId);

// /**
//  * @swagger
//  * /api/predictions/{id}:
//  *   put:
//  *     summary: Update an existing prediction
//  *     tags: [Predictions]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: Prediction ID
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/Prediction'
//  *     responses:
//  *       200:
//  *         description: Prediction updated successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 success:
//  *                   type: boolean
//  *                   example: true
//  *                 message:
//  *                   type: string
//  *                   example: prediction updated successfully
//  *                 data:
//  *                   $ref: '#/components/schemas/Prediction'
//  *       404:
//  *         description: Prediction not found
//  *       500:
//  *         description: Internal server error
//  */
// router.put("/:id", updatePrediction);

/**
 * @swagger
 * /api/predictions/{id}:
 *   delete:
 *     summary: Delete a prediction
 *     tags: [Predictions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Prediction ID
 *     responses:
 *       200:
 *         description: Prediction deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: prediction deleted successfully
 *       404:
 *         description: Prediction not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", deletePrediction);

export default router;
