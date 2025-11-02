import { Router } from "express";
import ApprovedPrediction from "../models/predictionsModel.js";
import { getCached, setCached } from "../services/cache.service.js";
import { fetchFixtures } from "../services/thirdparty.service.js";

const router = Router();

// get all fixtures for the day
async function getAllFixtures(req, res) {}
// get all predictions for a particular

//
