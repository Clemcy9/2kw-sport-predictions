import dotenv from "dotenv";
dotenv.config(); // this will load the .env file to process
import app from "./app.js";
import connectDb from "./config/db.js";
import { connectRedis } from "./config/redis.js";

//connect db
connectDb();

// start redis
await connectRedis();
app.listen(process.env.PORT, () => console.log("server running"));
