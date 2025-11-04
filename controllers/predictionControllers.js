import express from "express";
import AdminPrediction from "../models/predictionsModel.js";
import { fetchPredictions } from "../services/thirdparty.service.js";

// create AdminPrediction
export const createPrediction = async (req, res) => {
  // req must have just prediction id (third party) from which we will create our adminPredictions from
  const { fixture_id, user, selections } = req.body;
  if (!fixture_id)
    return res.status(400).json({ message: "fixture id required" });

  // needless storing the third party predictions in db, can always make reference to it
  // get third party predictions for the given fixture id
  const external_predictions = await fetchPredictions(fixture_id);
  // structure of external_predictions
  // external_predictions:resposns = [
  //   { predictions: {}, league: {}, teams: {}, comparison: {}, h2h: {} },
  // ];

  // structure of selections
  // selections = {
  //   free_tips: "1 or home",
  //   banker: "x or draw",
  //   super_single: "2 or away",
  //   free_2_odds: "ov 1.5",
  // };
  try {
    const newPrediction = await AdminPrediction.create({
      ...req.body,
      user_id: user._id,
    });
    res.status(200).json({
      message: "AdminPrediction added successfully",
      data: newPrediction,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `${error.message} AdminPrediction failed`,
    });
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
