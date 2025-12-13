import mongoose, { Types } from "mongoose";

const OddSchema = new mongoose.Schema(
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

    update: Date,
  },
  { timestamps: true }
);

export const Odds = mongoose.model("Odds", OddSchema);

const adminPredictionSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    bet_type: {
      type: String,
      enum: ["free_tips", "super_single", "sure_two_odds", "best_prediction"],
    },
    fixture: { type: mongoose.Schema.Types.Mixed },

    // leagueId: { type: String },
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
  { timestamps: true }
);
const AdminPrediction = mongoose.model(
  "AdminPrediction",
  adminPredictionSchema
);

// presave hook to auto add percentage field to each adminPrediction
export default AdminPrediction;
