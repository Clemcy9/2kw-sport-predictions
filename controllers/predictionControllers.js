import express from "express";
import AdminPrediction from "../models/predictionsModel.js";
import {
  fetchFixtures,
  fetchOdds,
  fetchPredictions,
} from "../services/thirdparty.service.js";

function oddsFilter(
  odds,
  start_percent = 65,
  stop_percent = 85,
  required_market = null
) {
  console.log("oddsfiltercalled, market:", required_market);
  const filteredOdds = odds
    .map((odd) => {
      // filtering bets -1st loop
      const filteredBets = odd.bets
        .map((bet) => {
          // filtering vaules -2nd loop
          const filteredValues = bet.values.filter((v) => {
            console.log("v is:", v);
            const p = parseFloat(v.percentage);
            return required_market
              ? p >= start_percent &&
                  p <= stop_percent &&
                  v.value.toLowerCase() === required_market
              : p >= start_percent && p <= stop_percent;
          });
          console.log("filteredvalues:", filteredValues);
          return filteredValues.length > 0
            ? { ...bet, values: filteredValues }
            : null;
        })
        .filter((b) => b !== null);
      if (filteredBets.length === 0) return null;
      console.log("oddfilter, filteredBets:", filteredBets);
      // return the odd with cleaned bets
      return { ...odd, bets: filteredBets };
    })
    .filter((odd) => odd !== null);
  return filteredOdds;
}

// get odds :admin via fixture, users via odds_type(called bet)
export const getOdds = async (req, res) => {
  // req must have just prediction id (third party) from which we will create our adminPredictions from
  console.log("getodds> body:", req.query);
  const fixture = req.query?.fixture;
  const bet = req.query?.bet;
  const name = req.query?.market_name; //used 2 distinguish bet with multi values like home/away, over/under ...
  const date = new Date().toISOString().split("T")[0];

  if (!fixture && !bet)
    return res
      .status(400)
      .json({ message: "fixture id or odds type required" });

  try {
    if (bet) {
      // fetch odds based on bet type and for a particular day

      // let {free_tips_id:100, sure_odds:200, banker:300, free_2_tips:400}
      // a logic that checks for admin saved odds (adminPredictions)
      if (parseInt(bet) >= 100) {
        const query = {
          "bets.id": bet,
          "fixture.match_date": {
            $gte: new Date(`${date}T00:00:00.000Z`),
            $lte: new Date(`${date}T23:59:59.999Z`),
          },
        };

        const adminPredictions = await AdminPrediction.find(query);

        return res.status(200).json({
          message: "successful",
          data: adminPredictions,
        });
      }
      const odds = await fetchOdds({ bet, date });
      const cleaned_odds = oddsFilter(odds, 65, 85, name);
      console.log("getodds, cleanded_odds:", cleaned_odds);
      return res.status(200).json({
        message: "successful",
        data: cleaned_odds,
      });
    } else {
      // get odds[] based on a particular fixture, mainly for admin page
      const odds = await fetchOdds({ fixture });
      res.status(200).json({ message: "successful", data: odds });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// create predictions: auth required
export const createPredictions = async (req, res) => {
  // payload should contain the fixture_id, then a dictionary of {super_single:{bets.id, chosen value}}
  const payload = req.body;
  const user_id = req.user.id;
  console.log("user:", user_id);
  if (!payload.bet)
    return res.status(404).json({ msg: "pls input values for bet" });

  // create predictions
  try {
    const prediction = await AdminPrediction.create({ ...payload, user_id });
    res.status(201).json({ message: "created", data: prediction });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get all predictions :admin only
export const getAllPredictions = async (req, res) => {
  const user_id = req.user.id; //gotten from authMiddleware

  try {
    // get all predictions created by a particular admin
    const predictions = await AdminPrediction.find({ user_id }).select(
      "-timestamps"
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
