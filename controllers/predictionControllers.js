import express from "express";
import AdminPrediction from "../models/predictionsModel.js";
import {
  fetchFixtures,
  fetchOdds,
  fetchPredictions,
} from "../services/thirdparty.service.js";

// get odds :admin via fixture_id, users via odds_type(called bet)
export const getOdds = async (req, res) => {
  // req must have just prediction id (third party) from which we will create our adminPredictions from
  const { fixture_id, bet } = req.body;
  if (!fixture_id && !bet)
    return res
      .status(400)
      .json({ message: "fixture id or odds type required" });

  try {
    if (bet) {
      // fetch odds based on type and for a particular day
      const today = new Date().toISOString().split("T")[0];
      const odds = await fetchOdds({ bet, today });
      // can spread present odds with admin created odds odds.bets = [...adminodds]
    } else {
      // get odds for a particular fixture
      const odds = await fetchOdds({ fixture_id });
    }

    // auto replace fixture_id in odds data with actual useful fixture info like teams, league ..
    // implemented on fetchodds
    // const fixture_details = await fetchFixtures(fixture_id);
    // odds.response.fixture = fixture_details.response;

    res.status(200).json({ message: "successful", data: odds });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// create predictions
export const createPredictions = async (req, res) => {
  const payload = req.body.params;
  if (!payload.bet)
    return res.status(404).json({ msg: "pls input values for bet" });

  // create predictions
  try {
    const prediction = await AdminPrediction.create(payload);
    res.status(201).json({ message: "created", data: prediction });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update AdminPrediction
export const updatePrediction = async (req, res) => {
  try {
    const updated = await AdminPrediction.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    res.status(200).json({
      success: true,
      message: "AdminPrediction updated successfully",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// delete AdminPrediction
export const deletePrediction = async (req, res) => {
  try {
    const deleted = await AdminPrediction.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: "AdminPrediction not found" });
    res.status(200).json({
      success: true,
      message: "AdminPrediction deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// to be worked on

// //get all AdminPrediction
// export const getPrediction = async (req, res) => {
//   try {
//     //this add matchId and date to the url when a req is sent to get AdminPrediction for a match or date of match
//     const { matchId, date } = req.query;
//     let filter = {}; // this empty query object will contain match_id and date

//     if (matchId) filter.match_id = matchId;
//     if (date) filter.createdAt = { $gte: new Date(date) };

//     const predictions = await AdminPrediction.find(filter).populate("match_id");
//     if (!predictions)
//       return res.status(404).json({ message: "no predctions found" });
//     res.status(200).json({
//       success: true,
//       data: predictions,
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// //get a particular AdminPrediction
// export const getPedictionId = async (req, res) => {
//   try {
//     const predictionId = await AdminPrediction.findById(req.params.id).populate(
//       "match_id"
//     );
//     if (!predictionId)
//       return res.status(404).json({ message: "AdminPrediction not found" });
//     res.status(200).json({
//       success: true,
//       message: "AdminPrediction gotten successfully",
//       data: predictionId,
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };
