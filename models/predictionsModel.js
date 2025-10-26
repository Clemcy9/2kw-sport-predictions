import mongoose, { Types } from "mongoose";
import User from "./userModel.js";
import Match from "./matchingModel.js";
const predictionSchema = mongoose.Schema(
  {
    match_id: { type: mongoose.Types.ObjectId, ref: "Match" },
    user_id: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    prediction_winner: { type: String },
    prediction_type: { type: String, enum: ["admin"] },
    confidence_score: { type: Number },
    odds: { type: Number },
    probability: { type: Number },
    //    free_tip: String,
    //    super_single_tip: String,
    //    free_2_odds: String,
    reasoning: { type: String },
  },
  { timestamps: true }
);
const Prediction = mongoose.model("Prediction", predictionSchema);
export default Prediction;
