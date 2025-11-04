import mongoose, { Types } from "mongoose";

const predictionSchema = new mongoose.Schema();

const adminPredictionSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    fixture_id: { type: mongoose.Types.ObjectId, ref: "Match" },
    leagueId: { type: String },
    selections: {
      free_tips: String,
      banker: String,
      free_2_odds: String,
      supersingle: String,
    },
  },
  { timestamps: true }
);
const AdminPrediction = mongoose.model(
  "AdminPrediction",
  adminPredictionSchema
);
export default AdminPrediction;
