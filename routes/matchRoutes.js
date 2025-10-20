import express from "express"
import {matchPredicitions} from "../controllers/matchControllers.js"

const router = express.Router()

router.get("/", matchPredicitions)