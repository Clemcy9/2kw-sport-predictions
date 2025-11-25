import express from "express";
import getMatches from "../controllers/matchControllers.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Matches
 *   description: fixtures for matches
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Match:
 *       type: object
 *       required:
 *         - teamA
 *         - teamB
 *         - match_date
 *         - status
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated ID of the match
 *         teamA:
 *           type: string
 *           description: The first team participating in the match
 *         teamB:
 *           type: string
 *           description: The second team participating in the match
 *         match_date:
 *           type: string
 *           format: date-time
 *           description: The scheduled date and time of the match
 *         status:
 *           type: string
 *           enum: [scheduled, ongoing, completed, cancelled]
 *           description: The current status of the match
 *         score:
 *           type: object
 *           properties:
 *             teamA:
 *               type: integer
 *               example: 2
 *             teamB:
 *               type: integer
 *               example: 1
 *       example:
 *         id: "662c2df6a22b4a8c18f8a321"
 *         teamA: "Lions FC"
 *         teamB: "Eagles United"
 *         match_date: "2025-10-25T15:00:00Z"
 *         status: "scheduled"
 *         score:
 *           teamA: 0
 *           teamB: 0
 */

/**
 * @swagger
 * /api/matches:
 *   get:
 *     summary: Retrieve a list of matches (optionally filtered)
 *     tags: [Matches]
 *     parameters:
 *       - in: query
 *         name: matchId
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter by match ID
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *         required: false
 *         description: Filter by matches occurring on or after this date
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [scheduled, ongoing, completed, cancelled]
 *         required: false
 *         description: Filter by match status
 *     responses:
 *       200:
 *         description: Successfully retrieved matches
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
 *                   example: matches gotten successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Match'
 *       404:
 *         description: No matches found
 *       500:
 *         description: Internal server error
 */

router.get("/", getMatches);

// get all fixtures

export default router;
