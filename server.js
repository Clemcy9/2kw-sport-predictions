import dotenv from "dotenv";
dotenv.config() // this will load the .env file to process

import express from "express";
import connectDb from "./config/db.js";
import blogRoutes from "./routes/blogsRoutes.js"
import predictionRoutes from "./routes/predictionRoutes.js";

const app = express()
app.use(express.json())
app.use(express.urlencoded({extends: true}))

//connect db
connectDb()

//connect blog routes
app.use("/api/blogs", blogRoutes)
//connect prediction routes
app.use("/api/predictions", predictionRoutes)


app.listen(process.env.PORT, () => console.log("server running"))

