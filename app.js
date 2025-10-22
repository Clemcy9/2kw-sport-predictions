import dotenv from "dotenv";
// dotenv.config(); // this will load the .env file to process

import express from "express";
import blogRoutes from "./routes/blogsRoutes.js";
import predictionRoutes from "./routes/predictionRoutes.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extends: true }));

// get /
app.get("/", async (req, res) => {
  res.status(200).json({ message: "welcome to root route" });
});
//connect blog routes
app.use("/api/blogs", blogRoutes);
//connect prediction routes
app.use("/api/predictions", predictionRoutes);

export default app;
