import dotenv from "dotenv";
dotenv.config(); // this will load the .env file to process
import app from "./app.js";
import connectDb from "./config/db.js";
import { connectRedis } from "./config/redis.js";
import { startBackgroundTask } from "./services/background.service.js";

//connect db
connectDb();

// start redis
await connectRedis();

// start background service
// await startBackgroundTask();
app.listen(process.env.PORT || 5000, () => console.log("server running"));
