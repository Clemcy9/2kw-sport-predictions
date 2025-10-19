import mongoose, { Types } from "mongoose";

const predictionSchema = mongoose.Schema(
    {
       match_id: {type:mongoose.Types.ObjectId, ref: "match"},
       admin_id: {type:mongoose.Types.ObjectId, ref: "admin", required: true},
       prediction_winner: {type: String},
       prediction_type: {type: String, enum: ["admin"]},
       confidence_score: {type: Number},
       odds: {type: Number},
       probability: {type: Number},
       free_tip: String,
       super_single_tip: String,
       free_2_odds: String,
       reasoning: {type: String},
    },
    {timestamps: true}
)
const prediction = mongoose.model("prediction", predictionSchema)
export default prediction