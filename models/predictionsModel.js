import mongoose, { Types } from "mongoose";

const ValueSchema = new mongoose.Schema(
  {
    value: { type: String, required: true },
    abbr: { type: String },
    odd: { type: mongoose.Schema.Types.Mixed },
    probability: { type: String, default: null },
  },
  { _id: false }
);

const BetSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true },
    name: { type: String, required: true },
    abbr: { type: String },
    marketType: { type: String },
    values: [ValueSchema],
  },
  { _id: false }
);

const PredictionSchema = new mongoose.Schema(
  {
    eventId: { type: mongoose.Schema.Types.Mixed, required: true },
    eventName: { type: String, required: true },
    bets: [BetSchema],
  },
  { timestamps: true }
);

const Prediction = mongoose.model("Prediction", PredictionSchema);

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
export { Prediction, AdminPrediction };
