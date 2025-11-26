import {
  fetchFixtures,
  fetchLiveScore,
  fetchPredictions,
  fetchStandings,
  fetchTopPlayer,
} from "../services/thirdparty.service.js";

async function getAllFixtures(req, res) {
  const today = new Date().toISOString().split("T")[0];
  console.log("today:", today);
  const date = req.query?.date || today;
  const fixtures = await fetchFixtures({ date });
  res.status(200).json({ message: "successful", data: fixtures });
}

async function getPredictions(req, res) {
  const fixture_id = req.query.fixture_id;
  if (!fixture_id)
    return res.status(400).json({ message: "error, fixture id required" });

  try {
    const predictions = await fetchPredictions(fixture_id);
    res.status(200).json({ message: "sucessful", data: predictions });
  } catch (error) {
    console.log("error getting predictions:", error);
    res.status(500).json({ message: "errror occured", error });
  }
}

async function getLivescore(req, res) {
  try {
    const livescore = await fetchLiveScore();
    res.status(200).json({ message: "successful", data: livescore });
  } catch (error) {
    res.status(500).json({ message: "error occured", error });
  }
}

async function getStandings(req, res) {
  // const { league, season } = req.query;
  const league = req.query.league;
  const season = req.query.season;
  if (!league) return res.status(400).json({ message: "league is required" });

  try {
    const standings = await fetchStandings({ league, season });
    res.status(200).json({ message: "successful", data: standings });
  } catch (error) {
    res.status(500).json({ message: "error occured", error });
  }
}

async function getTopPlayer(req, res) {
  const league = req.query.league;
  const season = req.query.season;
  if (!league) return res.status(400).json({ message: "league is required" });

  try {
    const top_scorer = await fetchTopPlayer({ league, season });
    res.status(200).json({ message: "successful", data: top_scorer });
  } catch (error) {
    res.status(500).json({ message: "error occured", error });
  }
}
export {
  getAllFixtures,
  getPredictions,
  getLivescore,
  getStandings,
  getTopPlayer,
};
