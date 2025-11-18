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
    // fixture_id: { type: mongoose.Types.ObjectId, ref: "Match" },
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
export default AdminPrediction;
