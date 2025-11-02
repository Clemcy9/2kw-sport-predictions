import mongoose, { Types } from "mongoose";
import User from "./userModel.js";
import Match from "./matchingModel.js";
const predictionSchema = mongoose.Schema(
  {
    user_id: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    match_id: { type: mongoose.Types.ObjectId, ref: "Match" },
    category: {
      type: String,
      enum: ["free_tip", "super_single", "banker", "free_2_odds"],
    },
    confidence_score: { type: Number },
    probability: { type: Number },
    odds: { type: Number },
    teams: [{ name: String, logo: String, team_id: String, is_home: Boolean }],
    // prediction_winner: { type: String },
    //    free_tip: String,
    //    super_single_tip: String,
    //    free_2_odds: String,
    // reasoning: { type: String },
  },
  { timestamps: true }
);
const Prediction = mongoose.model("Prediction", predictionSchema);
export default Prediction;
