import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  createAffiliateLink,
  getAllAffiliateLinks,
  getAffiliateLinkById,
  updateAffiliateLink,
  deleteAffiliateLink,
} from "../controllers/affiliateLinkController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: AffiliateLinks
 *   description: CRUD operations for Affiliate Links
 */
/**
 * @swagger
 * /api/v1/affiliatelinks:
 *   post:
 *     summary: Create a new affiliate link
 *     tags: [AffiliateLinks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - link_type
 *               - label
 *               - url
 *             properties:
 *               link_type:
 *                 type: string
 *                 enum: [navbar, footer]
 *                 example: navbar
 *               label:
 *                 type: string
 *                 example: link name for URL
 *               url:
 *                 type: string
 *                 example: https://example.com
 *                 description: Must start with http:// or https://
 *               status:
 *                 type: string
 *                 enum: [draft, published]
 *                 example: published
 *     responses:
 *       201:
 *         description: Affiliate link created successfully
 *       400:
 *         description: Missing or invalid fields
 *       500:
 *         description: Server error
 */

router.post("/", authMiddleware, createAffiliateLink);

/**
 * @swagger
 * /api/v1/affiliatelinks:
 *   get:
 *     summary: Get all affiliate links
 *     tags: [AffiliateLinks]
 *     responses:
 *       200:
 *         description: Successfully fetched affiliate links
 *       500:
 *         description: Server error
 */
router.get("/", authMiddleware, getAllAffiliateLinks);

/**
 * @swagger
 * /api/v1/affiliatelinks/{id}:
 *   get:
 *     summary: Get a single affiliate link by ID
 *     tags: [AffiliateLinks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Affiliate link ID
 *     responses:
 *       200:
 *         description: Affiliate link fetched successfully
 *       404:
 *         description: Affiliate link not found
 *       500:
 *         description: Server error
 */
router.get("/:id", authMiddleware, getAffiliateLinkById);

/**
 * @swagger
 * /api/v1/affiliatelinks/{id}:
 *   put:
 *     summary: Update an affiliate link
 *     tags: [AffiliateLinks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Affiliate link ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               link_type:
 *                 type: string
 *                 enum: [nav_bar, footer]
 *                 example: footer
 *               location:
 *                 type: string
 *                 example: about-page
 *               label:
 *                 type: string
 *                 example: Partner Link
 *               url:
 *                 type: string
 *                 example: https://partner.com
 *               status:
 *                 type: string
 *                 enum: [draft, published]
 *                 example: draft
 *     responses:
 *       200:
 *         description: Affiliate link updated successfully
 *       404:
 *         description: Affiliate link not found
 *       500:
 *         description: Server error
 */
router.put("/:id", authMiddleware, updateAffiliateLink);

/**
 * @swagger
 * /api/v1/affiliatelinks/{id}:
 *   delete:
 *     summary: Delete an affiliate link
 *     tags: [AffiliateLinks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Affiliate link ID
 *     responses:
 *       204:
 *         description: Affiliate link deleted successfully
 *       404:
 *         description: Affiliate link not found
 *       400:
 *         description: Bad request
 */
router.delete("/:id", authMiddleware, deleteAffiliateLink);

export default router;
