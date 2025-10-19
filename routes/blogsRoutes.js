import express from "express"
import { createBlog, getBlogs, getBlogId, updateBlog, deleteBlog } from "../controllers/blogControllers.js"
const router = express.Router()

router.post("/", createBlog)
router.get("/", getBlogs)
router.get("/:id", getBlogId)
router.put("/:id", updateBlog)
router.delete("/:id", deleteBlog)

export default router