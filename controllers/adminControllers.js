import ApprovedPrediction from "../models/predictionsModel.js";
import { getCached, setCached } from "../services/cache.service.js";
import { fetchFixtures } from "../services/thirdparty.service.js";

async function getAllFixtures(req, res) {
  const today = new Date().toISOString().split("T")[0];
  const date = req.body?.date || today;
  const fixtures = await fetchFixtures(date);
  res.status(200).json({ message: "successful", data: fixtures });
}

export { getAllFixtures };
