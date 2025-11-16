import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
import { getCached, setCached } from "./cache.service.js";
import AdminPrediction from "../models/predictionsModel.js";
const { RAPIDSPORT_API_KEY, RAPIDSPORT_BASE_URL, RAPIDSPORT_API_HOST } =
  process.env;

console.log("base url:", RAPIDSPORT_BASE_URL);

const api_client = axios.create({
  baseURL: RAPIDSPORT_BASE_URL,
  headers: {
    // Authorization: `Bearer ${RAPIDSPORT_API_KEY}`,
    "x-RapidAPI-Host": RAPIDSPORT_API_HOST,
    "x-apisports-key": RAPIDSPORT_API_KEY,
    Accept: "application/json",
  },
  timeout: 10000,
});

async function fetchFixtures(date) {
  console.log("base url:", RAPIDSPORT_BASE_URL);
  const params = {};
  if (date) params.date = date;

  // check cache
  const cached = await getCached("fixtures", params);
  if (cached) return cached;

  try {
    const res = await api_client.get("/fixtures", params);
    await setCached("fixtures", res.data, params);
    return res.data;
  } catch (error) {
    if (error.response)
      console.log("FetchFixturesError1:", error.response.data);
    else if (error.request) console.log("FetchFixturesError2:", error.request);
    else console.log("FetchFixturesError3:", error.message);
  }
}

async function fetchPredictions(matchId) {
  const params = { matchId };
  const cached = await getCached("predictions", { matchId });

  if (cached) return cached;

  try {
    const res = await api_client.get("/predictions", { params });
    await setCached("predictions", res.data, { matchId });
    return res.data;
  } catch (error) {
    if (error.response)
      console.log("FetchPredictionError1:", error.response.data);
    if (error.request) console.log("FetchPredictionError2:", error.request);
    else console.log("FetchPredictionError3:", error.message);
  }
}

async function fetchOdds(args) {
  // const params = { date, fixture_id, bet };
  const params = { ...args };

  const cached = await getCached("odds", params);

  if (cached) return cached;

  try {
    const res = await api_client.get("/odds", { params });

    // auto replace fixture_id in odds data with actual useful fixture info like teams, league ..
    const odds = res.data.response;
    await Promise.all(
      odds.map(async (odd) => {
        const fixture_details = await fetchFixtures(odd.fixture.id);
        odd.fixture = fixture_details.response;
      })
    );
    console.log("refined odds with fixtures:", odds);

    await setCached("odds", odds, params);
    return odds;
  } catch (error) {
    if (error.response) console.log("FetchOddsError1:", error.response.data);
    if (error.request) console.log("FetchOddsError2:", error.request);
    else console.log("FetchOddsError3:", error.message);
  }
}

async function fetchLiveScore() {
  const cached = await getCached("predictions");

  if (cached) return cached;

  try {
    const res = await api_client.get("/livescore");
    await setCached("livescore", res.data);
    return res.data;
  } catch (error) {
    if (error.response)
      console.log("FetchLiveScoreError1:", error.response.data);
    if (error.request) console.log("FetchLiveScoreError2:", error.request);
    else console.log("FetchLiveScoreError3:", error.message);
  }
}

async function fetchStandings(leagueId, season) {
  const params = {};
  if (leagueId) params.leagueId = leagueId;
  if (season) params.season = season;

  const cached = await getCached("standings", params);
  if (cached) return cached;

  try {
    const res = await api_client.get("/standings", params);
    await setCached("standings", res.data, params);
    return res.data;
  } catch (error) {
    if (error.response)
      console.log("FetchStandingsError1:", error.response.data);
    if (error.request) console.log("FetchStandingsError2:", error.request);
    else console.log("FetchStandingsError3:", error.message);
  }
}

export {
  fetchFixtures,
  fetchOdds,
  fetchLiveScore,
  fetchPredictions,
  fetchStandings,
};
