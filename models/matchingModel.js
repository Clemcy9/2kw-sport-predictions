import mongoose from "mongoose"

const matchSchema = mongoose.Schema(
    {
      sport_type: {type: String, enum: ["football", "basketball", "tennis"]},
      league: {type: String},
      home_team: {type: String},
      away_team: {type: String},
      match_date: Date,
      venue: {type: String},
      status: {type: String, enum: ["upcoming", "live", "finished"]},
      home_score: {type: Number, default: 0},
      away_score: {type: Number, default:0}
    },
    {timestamps: true}
)

const match = mongoose.model("match", matchSchema)

export default match