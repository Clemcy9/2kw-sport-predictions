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
  const { fixture_id, betId } = req.body;
  if (!fixture_id || !betId)
    return res
      .status(400)
      .json({ message: "fixture id or odds type required" });

  try {
    if (betId) {
      // fetch odds based on betId type and for a particular day
      const today = new Date().toISOString().split("T")[0];

      // let {free_tips_id:100, sure_odds:200, banker:300, free_2_tips:400}
      // a logic that checks for admin saved odds (adminPredictions)
      if (req.body?.betId >= 100) {
        const query = {
          "bets.id": betId,
          "fixture.match_date": {
            $gte: new Date(`${today}T00:00:00.000Z`),
            $lte: new Date(`${today}T23:59:59.999Z`),
          },
        };

        const adminPredictions = await AdminPrediction.find(query);

        return res.status(200).json({
          message: "successful",
          data: adminPredictions,
        });
      }
      const odds = await fetchOdds({ bet, today });
      return res.status(200).json({
        message: "successful",
        data: odds,
      });
    } else {
      // get odds[] based on a particular fixture
      const odds = await fetchOdds({ fixture_id });
    }

    res.status(200).json({ message: "successful", data: odds });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// create predictions
export const createPredictions = async (req, res) => {
  const payload = req.body;
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

// get all predictions :admin only
export const getAllPredictions = async (req, res) => {
  const user = req.body.user; //gotten from authMiddleware

  try {
    // get all predictions created by a particular admin
    const predictions = await AdminPrediction.find({ user_id: user.id }).select(
      "-timestamps -"
    );
    res.status(200).json({ message: "successful", data: predictions });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get a particular prediction :admin only
export const getPrediction = async (req, res) => {
  const user = req.body.user; //gotten from authMiddleware
  const prediction_id = req.body?.prediction_id;

  if (!prediction_id)
    return res.status(400).json({ message: "prediction_id is required" });
  try {
    // get a particular predictions created by a particular admin
    const prediction = await AdminPrediction.find({ user_id: user.id }).select(
      "-timestamps -"
    );
    res.status(200).json({ message: "successful", data: prediction });
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
