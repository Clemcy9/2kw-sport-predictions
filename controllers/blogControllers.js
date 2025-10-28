import express from "express";
import Blog from "../models/blogModel.js";

// create blog
export const createBlog = async (req, res) => {
  try {
    const newBlog = await Blog.create(req.body);
    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      data: newBlog,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: `${error} blog post failed` });
  }
};

// get blog
export const getBlogs = async (req, res) => {
  try {
    const blog = await Blog.find().populate("user", "email");
    res.status(200).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//get a particular post
export const getBlogId = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate("user", "email");
    if (!blog)
      return res
        .status(404)
        .json({ message: `${error.message} blog not found` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// update blog
export const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body);
    if (!blog) return res.status(404).json({ message: "blog not found" });
    res.status(200).json({
      success: true,
      message: "Blog updated sucessfully",
      data: blog,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// delete blog post
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ message: "blog not found" });
    res.status(500).json({
      success: true,
      message: "Blog deleted successfully",
      data: blog,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
