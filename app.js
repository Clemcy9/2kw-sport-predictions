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

// upload image endpoint
app.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
    req.file.filename
  }`;
  res.status(200).json({ imageUrl });
});

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

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
