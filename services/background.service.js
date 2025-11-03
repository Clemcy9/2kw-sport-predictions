import {
  fetchFixtures,
  fetchLiveScore,
  fetchPredictions,
  fetchStandings,
} from "./thirdparty.service.js";
import { setCached } from "./cache.service.js";

const league_ids = [399, 39, 140, 2, 848, 135, 79, 61, 865, 481];
const POLL_INTERVAL_SECONDS = parseInt(process.env.POLL_INTERVAL_SECONDS);

// We'll poll main endpoints periodically to keep Redis fresh.

function startBackgroundTask() {
  console.log("backgroud task running");
  setInterval(async () => {
    try {
      // fixtures for today
      const today = new Date().toISOString().split("T")[0];
      const today_fixtures = await fetchFixtures(today);
      console.log("backgroud task ran1");

      // livescore
      const livescore = await fetchLiveScore();
      // await setCached("livescore", livescore);
      console.log("backgroud task ran2");

      // all predictions via array of league ids
      league_ids.map((league_id) => {
        fetchPredictions(league_id);
      });

      console.log("backgroud task ran3");
    } catch (error) {
      console.log("background task error:", error.message || error);
    }
  }, POLL_INTERVAL_SECONDS * 1000);
}

export { startBackgroundTask };
