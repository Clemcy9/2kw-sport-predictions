import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  createMetadata,
  getAllMetadata,
  getMetadataById,
  updateMetadata,
  deleteMetadata,
} from "../controllers/metadataControllers.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Metadata
 *   description: CRUD operations for MetaData
 */

/**
 * @swagger
 * /api/v1/metadata:
 *   post:
 *     summary: Create a new metadata
 *     tags: [Metadata]
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
 *     responses:
 *       201:
 *         description: Metadata created successfully
 *       400:
 *         description: missing header or content
 *       500:
 *         description: server error
 */
router.post("/", authMiddleware, createMetadata);

/**
 * @swagger
 * /api/v1/metadata:
 *   get:
 *     summary: Get all metadata
 *     tags: [Metadata]
 *     responses:
 *       200:
 *         description: Successfully fetched all metadata
 *       500:
 *         description: server error
 */
router.get("/", authMiddleware, getAllMetadata);

/**
 * @swagger
 * /api/v1/metadata/{id}:
 *   get:
 *     summary: Get a single metadata by ID
 *     tags: [Metadata]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: metadata ID
 *     responses:
 *       200:
 *         description: metadata found successfully
 *       404:
 *         description: metadata not found
 *       500:
 *         description: Server error
 */
router.get("/:id", authMiddleware, getMetadataById);

/**
 * @swagger
 * /api/v1/metadata/{id}:
 *   put:
 *     summary: Update metadata
 *     tags: [Metadata]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: metadata ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               market_type:
 *                 type: string
 *                 required: true
 *               metadata_content:
 *                 type: string
 *                 required: true
 *     responses:
 *       200:
 *         description: metadata updated successfully
 *       404:
 *         description: metadata not found
 *       500:
 *         description: Server error
 */
router.put("/:id", authMiddleware, updateMetadata);

/**
 * @swagger
 * /api/v1/metadata/{id}:
 *   delete:
 *     summary: Delete metadata
 *     tags: [Metadata]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: metadata deleted successfully
 *       404:
 *         description: metadata not found
 *       400:
 *         description: Bad request
 */
router.delete("/:id", authMiddleware, deleteMetadata);

export default router;
