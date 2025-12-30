import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  createMetadata,
  getAllMetadata,
  getMetadataById,
  updateMetadata,
  deleteMetadata,
  getMetadataByMarketType,
} from "../controllers/metadataControllers.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Metadata
 *   description: Metadata management endpoints
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 *   schemas:
 *     Metadata:
 *       type: object
 *       required:
 *         - market_type
 *         - metadata_content
 *       properties:
 *         _id:
 *           type: string
 *           example: 64e1c8f0c5c1a92a6e9b3c10
 *         user:
 *           type: string
 *           example: 64e1c8f0c5c1a92a6e9b3c01
 *         market_type:
 *           type: string
 *           enum:
 *             - freeTip
 *             - superSingleTip
 *             - freeOdds
 *             - surePredict
 *             - match winner
 *             - double chance
 *             - over and Under
 *             - btts
 *             - about
 *             - allPrediction
 *             - contactUs
 *             - services
 *             - homePage
 *             - home win
 *             - away win
 *         page_title:
 *           type: string
 *         page_description:
 *           type: string
 *         page_keywords:
 *           type: string
 *         header_content:
 *           type: string
 *         header_sub_content:
 *           type: string
 *         metadata_content:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/v1/metadata:
 *   post:
 *     summary: Create metadata
 *     tags: [Metadata]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - market_type
 *               - metadata_content
 *             properties:
 *               market_type:
 *                 type: string
 *               metadata_content:
 *                 type: string
 *               page_title:
 *                 type: string
 *               page_description:
 *                 type: string
 *               page_keywords:
 *                 type: string
 *               header_content:
 *                 type: string
 *               header_sub_content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Metadata created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Metadata'
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.post("/", authMiddleware, createMetadata);

/**
 * @swagger
 * /api/v1/metadata:
 *   get:
 *     summary: Get all metadata (optionally filtered)
 *     tags: [Metadata]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: market_type
 *         schema:
 *           type: string
 *         description: Filter metadata by market type
 *     responses:
 *       200:
 *         description: List of metadata
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Metadata'
 *       401:
 *         description: Unauthorized
 */
router.get("/", authMiddleware, getAllMetadata);

/**
 * @swagger
 * /api/v1/metadata/{id}:
 *   get:
 *     summary: Get metadata by ID
 *     tags: [Metadata]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Metadata ID
 *     responses:
 *       200:
 *         description: Metadata fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Metadata'
 *       400:
 *         description: Invalid ID
 *       404:
 *         description: Metadata not found
 *       401:
 *         description: Unauthorized
 */
router.get("/:id", authMiddleware, getMetadataById);

/**
 * @swagger
 * /api/v1/metadata/market/{market_type}:
 *   get:
 *     summary: Get metadata by market type
 *     tags: [Metadata]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: market_type
 *         required: true
 *         schema:
 *           type: string
 *           enum:
 *             - freeTip
 *             - superSingleTip
 *             - freeOdds
 *             - surePredict
 *             - match winner
 *             - double chance
 *             - over and Under
 *             - btts
 *             - about
 *             - allPrediction
 *             - contactUs
 *             - services
 *             - homePage
 *             - home win
 *             - away win
 *         description: Market type
 *     responses:
 *       200:
 *         description: Metadata fetched successfully
 *       400:
 *         description: market_type is required
 *       404:
 *         description: Metadata not found
 *       401:
 *         description: Unauthorized
 */
router.get("/market/:market_type", authMiddleware, getMetadataByMarketType);

/**
 * @swagger
 * /api/v1/metadata/{id}:
 *   put:
 *     summary: Update metadata
 *     tags: [Metadata]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Metadata ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               market_type:
 *                 type: string
 *               metadata_content:
 *                 type: string
 *               page_title:
 *                 type: string
 *               page_description:
 *                 type: string
 *               page_keywords:
 *                 type: string
 *               header_content:
 *                 type: string
 *               header_sub_content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Metadata updated successfully
 *       400:
 *         description: Invalid ID or validation error
 *       404:
 *         description: Metadata not found
 *       401:
 *         description: Unauthorized
 */
router.put("/:id", authMiddleware, updateMetadata);

/**
 * @swagger
 * /api/v1/metadata/{id}:
 *   delete:
 *     summary: Delete metadata
 *     tags: [Metadata]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Metadata ID
 *     responses:
 *       200:
 *         description: Metadata deleted successfully
 *       400:
 *         description: Invalid ID
 *       404:
 *         description: Metadata not found
 *       401:
 *         description: Unauthorized
 */
router.delete("/:id", authMiddleware, deleteMetadata);

export default router;
