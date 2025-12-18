// import express from "express";
// import { getHead2Head } from "../controllers/head2headController.js";

// const router = express.Router();

// /**
//  * @swagger
//  * tags:
//  *   name: Head2Head
//  *   description: Recent performance for each team
//  */

// /**
//  * @swagger
//  * /api/v1/head2head:
//  *   get:
//  *     summary: Get head-to-head history between two teams
//  *     tags: [Head2Head]
//  *     parameters:
//  *       - in: query
//  *         name: teamA_id
//  *         required: true
//  *         schema:
//  *           type: integer
//  *         description: ID of the first team
//  *       - in: query
//  *         name: teamB_id
//  *         required: true
//  *         schema:
//  *           type: integer
//  *         description: ID of the second team
//  *     responses:
//  *       200:
//  *         description: Successful response
//  *       400:
//  *         description: Missing or invalid parameters
//  *       500:
//  *         description: Server error
//  */
// router.get("/", getHead2Head);

// export default router;



import express from "express";
import { getHead2Head } from "../controllers/head2headController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Head2Head
 *   description: Recent performance for each team
 */

/**
 * @swagger
 * /api/v1/head2head:
 *   get:
 *     summary: Get head-to-head history between two teams
 *     tags: [Head2Head]
 *     parameters:
 *       - in: query
 *         name: teamA_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the first team
 *       - in: query
 *         name: teamB_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the second team
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *       400:
 *         description: Missing or invalid parameters
 *       500:
 *         description: Server error
 */
router.get("/", getHead2Head);

export default router;
