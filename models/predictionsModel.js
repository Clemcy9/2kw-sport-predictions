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
    bet_type_id: { type: Number, required: true },
    fixture: {
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
      teams: mongoose.Schema.Types.Mixed,
      goals: { home: Number, away: Number },
      status: mongoose.Schema.Types.Mixed,
      // home_team: { type: String },
      // away_team: { type: String },
      // match_date: Date,
      // venue: { type: String },
      // status: { type: String, enum: ["upcoming", "live", "finished"] },
      // home_score: { type: Number, default: 0 },
      // away_score: { type: Number, default: 0 },
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
        required: true,
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
