import swaggerSpec from "./docs/swagger.js";
import swaggerUi from "swagger-ui-express";
import express from "express";
import cors from "cors";
import blogRoutes from "./routes/blogsRoutes.js";
import adminPredictionRoutes from "./routes/predictionsRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import footballRoutes from "./routes/footballRoutes.js";

const app = express();
app.use(cors());
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
app.use("/api/v1/blogs", blogRoutes);

//admin approved prediction routes
app.use("/api/v1/admin/predictions", adminPredictionRoutes);

// admin fixtures
app.use("/api/v1/football", footballRoutes);

export default app;
