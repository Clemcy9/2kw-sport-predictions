import {
  fetchFixtures,
  fetchLiveScore,
  fetchPredictions,
  fetcthStandings,
} from "./thirdparty.service.js";
import { setCached } from "./cache.service.js";

const POLL_INTERVAL_SECONDS = parseInt(process.env.POLL_INTERVAL_SECONDS);

// We'll poll main endpoints periodically to keep Redis fresh.
// Strategy: poll popular/needed endpoints (fixtures for today, livescore, top leagues standings).
// Avoid polling predictions for every match separately — fetch on demand for match-specific predictions (but cache results).

function startBackgroundTask() {
  setInterval(async () => {
    try {
      // fixtures for today
      const today_fixtures = await fetchFixtures(); //we may have to put date if need be
      await setCached("fixtures:today", today_fixtures);
      // might have to put calls for 2morrow and yesterday's fixtures

      // livescore
      const livescore = await fetchLiveScore();
      await setCached("livescore", livescore);

      // all predictions
      // const today_generic_predictions = await fetchPredictions() //need match id
      // await setCached('predictions:generic', today_generic_predictions)

      console.log("backgroud task ran");
    } catch (error) {
      console.log("background task error:", error.message || error);
    }
  }, POLL_INTERVAL_SECONDS * 1000);
}

export { startBackgroundTask };
