import express from "express";
import Prediction from "../models/predictionsModel.js";

// create Prediction
export const createPrediction = async (req, res) => {
  try {
    //this line makes sure that every Prediction is connected to a match
    req.body.match_id = req.body.match_id || req.params.matchId;
    const newPrediction = await Prediction.create(req.body);
    res.status(200).json({
      success: true,
      message: "Prediction added successfully",
      data: newPrediction,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: `${error.message} Prediction failed` });
  }
};

//get Prediction
export const getPrediction = async (req, res) => {
  try {
    //this add matchId and date to the url when a req is sent to get Prediction for a match or date of match
    const { matchId, date } = req.query;
    let filter = {}; // this empty query object will contain match_id and date

    if (matchId) filter.match_id = matchId;
    if (date) filter.createdAt = { $gte: new Date(date) };

    const predictions = await Prediction.find(filter).populate("match_id");
    if (!predictions)
      return res.status(404).json({ message: "no predctions found" });
    res.status(200).json({
      success: true,
      data: predictions,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//get a particular Prediction
export const getPedictionId = async (req, res) => {
  try {
    const predictionId = await Prediction.findById(req.params.id).populate(
      "match_id"
    );
    if (!predictionId)
      return res.status(404).json({ message: "Prediction not found" });
    res.status(200).json({
      success: true,
      message: "Prediction gotten successfully",
      data: predictionId,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// update Prediction
export const updatePrediction = async (req, res) => {
  try {
    const updated = await Prediction.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({
      success: true,
      message: "Prediction updated successfully",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// delete Prediction
export const deletePrediction = async (req, res) => {
  try {
    const deleted = await Prediction.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: "Prediction not found" });
    res.status(200).json({
      success: true,
      message: "Prediction deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
