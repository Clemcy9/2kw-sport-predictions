import mongoose from "mongoose";

//blog schema
const blogSchema = mongoose.Schema(
  {
    user: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    title: { type: String, required: true },
    body: { type: String, required: true },
    image_url: { type: String },
    views: { type: Number, default: 0 },
    blogKeywords: String,
    description: String,
    status: {
      type: String,
      enum: ["draft", "published", "seo"],
      default: "draft",
    },
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
