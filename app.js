import swaggerSpec from "./docs/swagger.js";
import swaggerUi from "swagger-ui-express";
import express from "express";
import blogRoutes from "./routes/blogsRoutes.js";
import predictionRoutes from "./routes/predictionRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extends: true }));

// get /
app.get("/", async (req, res) => {
  res.status(200).json({ message: "welcome to root route" });
});

// api docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// authentication routes
app.use("/api/v1/auth", authRoutes);
//connect blog routes
app.use("/api/blogs", blogRoutes);

//connect prediction routes
app.use("/api/predictions", predictionRoutes);

// admin fixtures
app.use("/api/admin", adminRoutes);

export default app;
