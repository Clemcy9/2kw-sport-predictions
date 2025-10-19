import express from "express"
import prediction from "../models/predictionsModel.js"

// create prediction 
export const createPrediction = async (req, res) => {
    try {
        //this line makes sure that every prediction is connected to a match 
        req.body.match_id = req.body.match_id || req.params.matchId
        const newPrediction = await prediction.create(req.body)
        res.status(200).json({
            success: true,
            message: "prediction added successfully",
            data: newPrediction
        })
    }
     catch(error){
            res.status(500).json({success: false, message: `${error.message} prediction failed`})
        }
}

//get prediction 
export const getPrediction = async (req, res) => {
    try{
        //this add matchId and date to the url when a req is sent to get prediction for a match or date of match
        const {matchId, date} = req.query
        let filter = {} // this empty query object will contain match_id and date

        if(matchId) filter.match_id = matchId
        if(date) filter.createdAt = {$gte: new Date(date)}

        const predictions = await prediction.find(filter).populate("match_id")
        if(!predictions) return res.status(404).json({message: "no predctions found"})
        res.status(200).json({
            success: true,
            data: predictions
        })
    }catch(error){
        res.status(500).json({success: false, message: error.message})
    }
}

//get a particular prediction 
export const getPedictionId = async (req, res) => {
    try{
        const predictionId = await prediction.findById(req.params.id).populate("match_id")
        if(!predictionId) return res.status(404).json({message: "prediction not found"})
        res.status(200).json({
        success: true,
        message: "prediction gotten successfully",
        data: predictionId
    })    
    }catch(error){
    res.status(500).json({success: false, message: error.message})
    }
}

// update prediction 
export const updatePrediction = async (req, res) => {
    try{
        const updated = await prediction.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).json({
            success: true,
            message: "prediction updated successfully",
            data: updated
        })
    }catch(error){
        res.status(500).json({success: false, message: error.message})
    }
}

// delete prediction 
export const deletePrediction = async (req, res) => {
    try{
        const deleted = await prediction.findByIdAndDelete(req.params.id)
        if(!deleted) return res.status(404).json({message: "prediction not found"})
            res.status(200).json({
            success: true,
            message: "prediction deleted successfully"

    })
    }catch(error){
        res.status(500).json({success: false, message: error.message})
    }   
} 

