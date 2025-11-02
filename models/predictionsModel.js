import mongoose, { Types } from "mongoose";
import User from "./userModel.js";
import Match from "./matchingModel.js";

const approvedPredictionSchema = mongoose.Schema(
  {
    user_id: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    match_id: { type: mongoose.Types.ObjectId, ref: "Match" },
    leagueId: { type: String },
    status: String,
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
const ApprovedPrediction = mongoose.model(
  "ApprovedPrediction",
  approvedPredictionSchema
);
export default ApprovedPrediction;

// const ApprovedPredictionSchema = new mongoose.Schema(
//   {
//     matchId: { type: String, required: true, index: true },
//     leagueId: { type: String },
//     season: { type: String },
//     selections: [
//       {
//         sourcePredictionId: String, // id from third-party
//         market: String, // e.g., "1X2", "over/under", "both_to_score"
//         pick: String, // e.g., "home", "draw", "over"
//         odd: Number,
//       },
//     ],
//     category: {
//       type: String,
//       enum: ["banker", "sure_odds", "free_tip", "two_sure_odds"],
//       required: true,
//     },
//     adminId: { type: String }, // store admin identifier
//     notes: { type: String },
//     createdAt: { type: Date, default: Date.now },
//   },
//   { timestamps: true }
// );
