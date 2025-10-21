import express from "express";
import {
  createBlog,
  getBlogs,
  getBlogId,
  updateBlog,
  deleteBlog,
} from "../controllers/blogControllers.js";
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Blogs
 *   description: Blog CRUD
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Blog:
 *       type: object
 *       required:
 *         - title
 *         - content
 *         - user
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated ID of the blog
 *         title:
 *           type: string
 *           description: Blog post title
 *         content:
 *           type: string
 *           description: Content of the blog post
 *         user:
 *           type: string
 *           description: ID of the user who created the blog
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *       example:
 *         id: 662c10d2f8d2b41d8c1a7e99
 *         title: "How to Build a REST API with Express"
 *         content: "This tutorial explains how to build a REST API using Node.js and Express."
 *         user: "661a34b3f8d2b41d8c1a7b25"
 *         createdAt: "2025-10-21T12:00:00Z"
 *         updatedAt: "2025-10-21T12:30:00Z"
 */




/**
 * @swagger
 * /api/blogs:
 *   post:
 *     summary: Create a new blog post
 *     tags: [Blogs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Blog'
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
router.post("/", createBlog);


/**
 * @swagger
 * /api/blogs:
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
 * /api/blogs/{id}:
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
 * /api/blogs/{id}:
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
router.put("/:id", updateBlog);


/**
 * @swagger
 * /api/blogs/{id}:
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
router.delete("/:id", deleteBlog);



export default router;
