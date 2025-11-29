import express from "express";
import {
  createBlog,
  getBlogs,
  getBlogId,
  updateBlog,
  deleteBlog,
} from "../controllers/blogControllers.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { upload } from "../middleware/fileUploadMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Blog:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 64f3b5a3fbd12c0012345678
 *         user:
 *           type: array
 *           items:
 *             type: string
 *           example: ["64f3b5a3fbd12c0012345678"]
 *         title:
 *           type: string
 *           example: "My first blog post"
 *         body:
 *           type: string
 *           example: "This is the body of my first blog post"
 *         image_url:
 *           type: string
 *           example: "http://localhost:5000/uploads/123456789.png"
 *         views:
 *           type: integer
 *           example: 0
 *         status:
 *           type: string
 *           enum: [draft, published, seo]
 *           example: draft
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2025-11-29T20:00:00.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2025-11-29T20:00:00.000Z"
 */

/**
 * @swagger
 * /api/v1/blogs/:
 *   post:
 *     summary: Create a new blog post
 *     tags: [Blogs]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Blog title
 *                 example: "My first blog post"
 *               body:
 *                 type: string
 *                 description: Blog content
 *                 example: "This is the body of my first blog post"
 *               status:
 *                 type: string
 *                 description: Blog status
 *                 enum: [draft, published, seo]
 *                 example: draft
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Image file (png, jpeg, jpg) to upload
 *             required:
 *               - title
 *               - body
 *     responses:
 *       201:
 *         description: Blog created successfully
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
 *                   example: Blog created successfully
 *                 data:
 *                   $ref: '#/components/schemas/Blog'
 *       500:
 *         description: Server error
 */
router.post("/", authMiddleware, upload.single("image"), createBlog);

/**
 * @swagger
 * /api/v1/blogs:
 *   get:
 *     summary: Get all blog posts
 *     tags: [Blogs]
 *     responses:
 *       200:
 *         description: Successfully fetched all blogs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Blog'
 *       500:
 *         description: Server error
 */
router.get("/", getBlogs);

/**
 * @swagger
 * /api/v1/blogs/{id}:
 *   get:
 *     summary: Get a single blog post by ID
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Blog ID
 *     responses:
 *       200:
 *         description: Blog found successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Blog'
 *       404:
 *         description: Blog not found
 *       500:
 *         description: Server error
 */
router.get("/:id", getBlogId);

/**
 * @swagger
 * /api/v1/blogs/{id}:
 *   put:
 *     summary: Update a blog post
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Blog ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Blog'
 *     responses:
 *       200:
 *         description: Blog updated successfully
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
 *                   example: Blog updated successfully
 *                 data:
 *                   $ref: '#/components/schemas/Blog'
 *       404:
 *         description: Blog not found
 *       500:
 *         description: Server error
 */
router.put("/:id", authMiddleware, updateBlog);

/**
 * @swagger
 * /api/v1/blogs/{id}:
 *   delete:
 *     summary: Delete a blog post
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Blog ID
 *     responses:
 *       200:
 *         description: Blog deleted successfully
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
 *                   example: Blog deleted successfully
 *       404:
 *         description: Blog not found
 *       400:
 *         description: Bad request
 */
router.delete("/:id", authMiddleware, deleteBlog);

export default router;
