import mongoose from "mongoose";

//blog schema
const blogSchema = mongoose.Schema(
  {
    user: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    title: { type: String, required: true },
    body: String,
    image: String,
    views: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
