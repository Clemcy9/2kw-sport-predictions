import mongoose from "mongoose";

//user schema
const adminSchema = mongoose.Schema (
    { 
      name : {type: String, required:true},
      email: {type: String, required: true, unique: true},
      password: {type: String, required: true, select: false},
      role: "admin",
    },  
    {timestamps: true}
)
const User = mongoose.model("User", adminSchema)

export default User