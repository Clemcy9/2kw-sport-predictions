import express from "express";
import Blog from "../models/blogModel.js";

// create blog
export const createBlog = async (req, res) => {
  try {
    if (!req.user) {
      if (req.file) {
        fs.unlinkSync(path.join("uploads", req.file.filename));
      }
      return res
        .status(403)
        .json({ message: "unathorized only admin can perform this action" });
    }

    // image upload is optional
    let imageUrl = "";
    if (req.file) {
      imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
        req.file.filename
      }`;
    }
    const { title, body, image } = req.body;
    if (!title || !body) {
      // delete uploaded file if exists but other fields are missing
      if (req.file) {
        fs.unlinkSync(path.join("uploads", req.file.filename));
      }
      return res.status(400).json("Please Fill In Those Fields");
    }
    console.log("user:", req.user);
    const newBlog = await Blog.create({
      ...req.body,
      user: req.user.id,
      image_url: imageUrl,
    });
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
    const blog = await Blog.find()
      .populate("user", "email")
      .sort({ createdAt: -1 });
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
    if (!blog) {
      return res.status(404).json({ message: `blog not found` });
    }
    return res
      .status(200)
      .json({ success: true, message: "Blog gotten successfully", data: blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// update blog
export const updateBlog = async (req, res) => {
  try {
    if (!req.user) {
      //|| !req.user.isAdmin
      return res
        .status(403)
        .json({ message: "Unauthorized user, only admin can update blog" });
    }
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
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
    if (!req.user) {
      //|| !req.user.isAdmin
      return res.status(403).json({ message: "Unauthorized user" });
    }

    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ message: "blog not found" });
    res.status(200).json({
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
