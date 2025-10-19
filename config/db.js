import mongoose from "mongoose";

const connectDb = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("connected to db successfully")
    }
    catch (err){
        console.log("Database connection failed:", err)
    }
}
connectDb()

export default connectDb
