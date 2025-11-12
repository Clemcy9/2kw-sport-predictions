import mongoose, { Types } from "mongoose";

const PredictionSchema = new mongoose.Schema(
  {
    league: {
      id: Number,
      name: String,
      country: String,
      logo: String,
      flag: String,
      season: Number,
    },
    fixture: {
      id: Number,
      timezone: String,
      date: Date,
      timestamp: Number,
    },
    bookmaker: {
      id: Number,
      name: String,
      bets: [
        {
          id: Number,
          name: String,
          values: [
            {
              value: mongoose.Schema.Types.Mixed,
              odd: String,
              percentage: String, //dynamically calculated
            },
          ],
        },
      ],
    },
    update: Date,
  },
  { timestamps: true }
);

export const Prediction = mongoose.model("Prediction", PredictionSchema);

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
