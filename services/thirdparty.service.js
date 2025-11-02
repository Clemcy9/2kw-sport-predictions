import axios from "axios";
const { RAPIDSPORT_API_KEY, RAPIDSPORT_BASE_UR } = process.env;

const api_client = axios.create({
  baseURL: RAPIDSPORT_BASE_UR,
  headers: {
    Authorization: `Bearer ${RAPIDSPORT_API_KEY}`,
    Accept: "application/json",
  },
  timeout: 10000,
});

// endpoints are: /fixtures, /predictions, /livescore, /standings, /player/topscorer

async function fetchFixtures(date) {
  // date format 'YYYY-MM-DD'
  const params = {};
  if (date) params.date = date;
  api_client
    .get("/fixtures", { params })
    .then((res) => {
      return res.data;
    })
    .cathch((error) => {
      if (error.response)
        console.log("FetchFixturesError:", error.response.data);
      if (error.request) console.log("FetchFixturesError:", error.request);
      else console.log("FetchFixturesError:", error.message);
    });
}

async function fetchPredictions(matchId) {
  const params = { matchId };
  api_client
    .get("/predictions", { params })
    .then((res) => {
      return res.data;
    })
    .cathch((error) => {
      if (error.response)
        console.log("FetchPredictionError:", error.response.data);
      if (error.request) console.log("FetchPredictionError:", error.request);
      else console.log("FetchPredictionError:", error.message);
    });
}

async function fetchLiveScore() {
  api_client
    .get("/livescore")
    .then((res) => {
      return res.data;
    })
    .cathch((error) => {
      if (error.response)
        console.log("FetchLiveScoreError:", error.response.data);
      if (error.request) console.log("FetchLiveScoreError:", error.request);
      else console.log("FetchLiveScoreError:", error.message);
    });
}

async function fetcthStandings(leagueId, season) {
  const params = {};
  if (leagueId) params.leagueId = leagueId;
  if (season) params.season = season;
  api_client
    .get("/standings", { params })
    .then((res) => {
      return res.data;
    })
    .cathch((error) => {
      if (error.response)
        console.log("FetchStandingsError:", error.response.data);
      if (error.request) console.log("FetchStandingsError:", error.request);
      else console.log("FetchStandingsError:", error.message);
    });
}

export { fetchFixtures, fetchLiveScore, fetchPredictions, fetcthStandings };
