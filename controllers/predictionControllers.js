import express from "express";
import AdminPrediction from "../models/predictionsModel.js";
import {
  fetchFixtures,
  fetchOdds,
  fetchPredictions,
} from "../services/thirdparty.service.js";

const admin_required_market = [
  "home",
  "away",
  "over 1.5",
  "over 2.5",
  "under 1.5",
  "under 2.5",
  "yes",
  "no",
  "home/draw",
  "home/away",
  "draw/away",
];

const admin_required_bets = [
  "match winner",
  "goals over/under",
  "both teams score",
  "double chance",
];

function oddsFilter(
  odds,
  start_percent = 65,
  stop_percent = 85,
  required_market = null,
  required_bet = null
) {
  // allway makesure the required market is an array
  // normalize required markets
  let marketList = required_market
    ? (Array.isArray(required_market)
        ? required_market
        : [required_market]
      ).map((m) => m.toLowerCase())
    : null;

  // normalize required bets
  let betList = required_bet
    ? (Array.isArray(required_bet) ? required_bet : [required_bet]).map((b) =>
        b.toLowerCase()
      )
    : null;

  console.log("total odds:", odds.length);
  const filteredOdds = odds
    .map((odd) => {
      // filtering bets -1st loop
      // filter out unwanted bets before maping
      const filteredBets = odd.bets
        .filter((b) => {
          // only filter if theres a betlist else skip
          if (!betList) {
            return true;
          } else {
            return betList.includes(b.name.toLowerCase());
          }
        })
        .map((bet) => {
          // filtering vaules -2nd loop
          const filteredValues = bet.values.filter((v) => {
            const p = parseFloat(v.percentage);
            return required_market
              ? p >= start_percent &&
                  p <= stop_percent &&
                  marketList.includes(v.value.toLowerCase())
              : p >= start_percent && p <= stop_percent;
          });
          return filteredValues.length > 0
            ? { ...bet, values: filteredValues }
            : null;
        })
        .filter((b) => b !== null);

      if (filteredBets.length === 0) return null;
      // return the odd with cleaned bets
      return { ...odd, bets: filteredBets };
    })
    .filter((odd) => odd !== null);
  return filteredOdds;
}

export const getOdds = async (req, res) => {
  const { fixture, bet, market_name: name, odd_date } = req.query;
  const todayStart = new Date().setHours(0, 0, 0, 0);
  const todayEnd = new Date().setHours(23, 59, 59, 999);
  const todays_date = new Date(todayStart).toISOString().split("T")[0];
  const date = odd_date ? odd_date : todays_date;

  console.log("payload is:", req.query);

  if (!fixture && !bet)
    return res
      .status(400)
      .json({ message: "fixture id or odds type required" });

  try {
    // If bet is provided
    if (bet) {
      const betId = parseInt(bet, 10);

      // Admin saved odds for bet >= 100
      if (betId >= 100) {
        const adminPredictions = await AdminPrediction.find({
          bet_type_id: betId,
          "fixture.fixture.date": { $gte: todayStart, $lte: todayEnd },
        });
        return res
          .status(200)
          .json({ message: "successful", data: adminPredictions });
      }

      // Fetch odds from third-party
      const odds = await fetchOdds({
        bet: betId,
        date,
      });

      // Special cases: double chance or both team score
      const filteredOdds =
        betId === 8 || betId === 12
          ? oddsFilter(odds, 65, 85)
          : oddsFilter(odds, 65, 85, name);

      return res
        .status(200)
        .json({ message: "successful", data: filteredOdds });
    }

    // If fixture is provided (mainly admin page)
    if (fixture) {
      const odds = await fetchOdds({ fixture });
      const cleanedData = oddsFilter(
        odds,
        65,
        85,
        admin_required_market,
        admin_required_bets
      );
      return res.status(200).json({ message: "successful", data: cleanedData });
    }
  } catch (error) {
    console.error("getOdds error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// create predictions: auth required. required payload:{bets, fixture_id, admin_bet_type}
export const createPredictions = async (req, res) => {
  // payload should contain the fixture_id, then a dictionary of {super_single:{bets.id, chosen value}}
  // predictions = [{fixture_id, bet_type:supersingle, bets}, {fixture_id, bet_type:freeTwoOdds, bets}]
  // structure of payload
  // "bets": [
  //       {
  //         "id": 1,
  //         "name": "match winner",
  //         "values": [
  //           {
  //             "value": "Yes",
  //             "odd": "1.49",
  //             "percentage": "67.11"
  //           }
  //         ]
  //       }
  //     ]
  const payload = req.body;
  const user_id = req.user.id;
  console.log("payload is:", payload);
  console.log("user:", user_id);
  if (!payload)
    return res.status(404).json({ msg: "pls input values for bet" });

  // create predictions
  try {
    // first fetch the odds with given fixture id
    const predictions = await Promise.all(
      payload.map(async (admin_predict) => {
        const fixture = admin_predict.fixture_id;
        const odd = await fetchOdds({ fixture });

        // modify odd to carry custom admin prediction name and value
        // odd.bets = admin_predict.bets;
        console.log("admin prediction:", odd);
        return await AdminPrediction.create({
          ...odd,
          fixture: odd[0].fixture,
          bets: admin_predict.bets,
          bet_type: admin_predict.bet_type,
          bet_type_id: admin_predict.bet_type_id,
          user_id,
        });
      })
    );
    res.status(201).json({ message: "created", data: predictions });
  } catch (error) {
    res.status(500).json({ message: error });
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

// update AdminPrediction : not functional
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
