import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
import { getCached, setCached } from "./cache.service.js";
import AdminPrediction from "../models/predictionsModel.js";
const { RAPIDSPORT_API_KEY, RAPIDSPORT_BASE_URL, RAPIDSPORT_API_HOST } =
  process.env;

// console.log("base url:", RAPIDSPORT_BASE_URL);

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

async function fetchFixtures(args) {
  const params = { ...args };

  // check cache using both date and fixture (fixture_id)
  const cached = await getCached("fixtures", params);
  if (cached) return cached;

  try {
    const res = await api_client.get("/fixtures", { params });

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
  console.log("in fetchodds");
  const params = { ...args, bookmaker: 11 };
  // console.log("fetchodds params:", params);

  const cached = await getCached("odds", params);
  // console.log("response from cache:", cached);

  if (cached) return cached;

  try {
    const res = await api_client.get("/odds", { params });

    const odds = await res.data.response;
    // console.log("response fetch:", odds);

    // replacing fixture id, with actual fixture details by fetching fixture with each unique id
    await Promise.all(
      odds.map(async (odd) => {
        const fixture_details = await fetchFixtures({ id: odd.fixture.id });
        odd.fixture = fixture_details.response;
        // console.log("old fixture:", odd.fixture);
      })
    );

    // scraping out unneccessary data (cleaning dataset)
    const cleaned_odds = odds.map((odd) => {
      const fx = odd.fixture[0]; // the actual fixture object
      return {
        fixture: {
          fixture: fx.fixture,
          league: fx.league,
          teams: fx.teams,
          goals: fx.goals,
          status: fx.fixture.status, // nested
        },
        bets: odd.bookmakers?.[0]?.bets ?? [],
      };
    });
    // console.log("cleaned odds:", cleaned_odds);

    await setCached("odds", cleaned_odds, params);
    return cleaned_odds;
  } catch (error) {
    if (error.response) console.log("FetchOddsError1:", error.response.data);
    if (error.request) console.log("FetchOddsError2:", error.request);
    else console.log("FetchOddsError3:", error.message);
  }
}

async function fetchLiveScore() {
  const params = {live:'all'}
  const cached = await getCached("predictions", params);

  if (cached) return cached;

  try {
    const res = await api_client.get("/features/livescore", {params});
    await setCached("livescore", res.data, params);
    return res.data;
  } catch (error) {
    if (error.response)
      console.log("FetchLiveScoreError1:", error.response.data);
    if (error.request) console.log("FetchLiveScoreError2:", error.request);
    else console.log("FetchLiveScoreError3:", error.message);
  }
}

async function fetchStandings(args) {
  const date = new Date();
  const current_year = date.getFullYear();
  const params = args.season ? { ...args } : { ...args, season: current_year };

  const cached = await getCached("standings", params);
  if (cached) return cached;

  try {
    const res = await api_client.get("/standings", { params });
    await setCached("standings", res.data, params);
    return res.data;
  } catch (error) {
    if (error.response)
      console.log("FetchStandingsError1:", error.response.data);
    if (error.request) console.log("FetchStandingsError2:", error.request);
    else console.log("FetchStandingsError3:", error.message);
  }
}

//
async function fetchTopPlayer(args) {
  const date = new Date();
  const current_year = date.getFullYear();
  const params = args.season ? { ...args } : { ...args, season: current_year };

  const cached = await getCached("top-player");

  if (cached) return cached;

  try {
    const res = await api_client.get("/players/topscorers", { params });
    await setCached("top-player", res.data, params);
    return res.data;
  } catch (error) {
    if (error.response)
      console.log("FetchTopScorerError1:", error.response.data);
    if (error.request) console.log("FetchTopScorerError2:", error.request);
    else console.log("FetchTopScorerError3:", error.message);
  }
}

export {
  fetchFixtures,
  fetchOdds,
  fetchLiveScore,
  fetchPredictions,
  fetchStandings,
  fetchTopPlayer,
};
