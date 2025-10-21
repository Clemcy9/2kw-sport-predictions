import express from "express"
import match from "../models/matchingModel.js"

// logic to get matches
const getMatches = async (req, res) => {
    try {
        const { matchId, date, status } = req.query
        let filter = {}
        if (matchId) filter._id = matchId
        if (date) filter.match_date = { $gte: new Date(date) }
        if (status) filter.status = status
        const allMatches = await matches.find(filter)
        if (!allMatches) return res.status(404).json({
            message: "no match found"
        })
        
        res.status(200).json({
            success: true,
            message: "matches gotten successfully",
            data: allMatches
        })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

export default getMatches