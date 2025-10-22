import app from "./app.js";
import dotenv from "dotenv";
dotenv.config(); // this will load the .env file to process
import connectDb from "./config/db.js";

//connect db
connectDb();

app.listen(process.env.PORT, () => console.log("server running"));
