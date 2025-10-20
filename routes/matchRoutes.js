import express from "express"
import getMatches from "../controllers/matchControllers.js"

const router = express.Router()

router.get("/", getMatches)

export default router