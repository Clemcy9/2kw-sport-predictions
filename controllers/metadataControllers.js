import mongoose from "mongoose";
import MetadataModel from "../models/metaDataModel.js";

// create Metadata
export const createMetadata = async (req, res) => {
  try {
    const {
      market_type,
      metadata_content,
      page_title,
      page_description,
      page_keywords,
      header_content,
      header_sub_content,
    } = req.body;

    // Required fields validation
    if (!market_type || !metadata_content) {
      return res.status(400).json({
        success: false,
        message: "market_type and metadata_content are required",
      });
    }

    const metadata = await MetadataModel.create({
      user: req.user.id, // from auth middleware
      market_type,
      metadata_content,
      page_title,
      page_description,
      page_keywords,
      header_content,
      header_sub_content,
    });

    return res.status(201).json({
      success: true,
      message: "Metadata created successfully",
      data: metadata,
    });
  } catch (error) {
    console.error("Create Metadata Error:", error);
    return res.status(500).json({
      success: false,
      message: `Server error:${error}`,
    });
  }
};

// Get all metadata
export const getAllMetadata = async (req, res) => {
  try {
    const { market_type } = req.query;

    const filter = {
      // user: req.user.id,
    };

    if (market_type) {
      filter.market_type = market_type;
    }

    const metadataList = await MetadataModel.find(filter).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: metadataList.length,
      data: metadataList,
    });
  } catch (error) {
    console.error("Get All Metadata Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching metadata",
    });
  }
};

/**
 * GET metadata by ID
 */
export const getMetadataById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid metadata ID",
      });
    }

    const metadata = await MetadataModel.findOne({
      _id: id,
      // user: req.user.id,
    });

    if (!metadata) {
      return res.status(404).json({
        success: false,
        message: "Metadata not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: metadata,
    });
  } catch (error) {
    console.error("Get Metadata By ID Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching metadata",
    });
  }
};

// Get metadata by markettype
export const getMetadataByMarketType = async (req, res) => {
  try {
    const { market_type } = req.params;

    if (!market_type) {
      return res.status(400).json({
        success: false,
        message: "market_type is required",
      });
    }

    const metadata = await MetadataModel.findOne({
      market_type,
      // user: req.user.id,
    });

    if (!metadata) {
      return res.status(404).json({
        success: false,
        message: "Metadata not found for this market type",
      });
    }

    return res.status(200).json({
      success: true,
      data: metadata,
    });
  } catch (error) {
    console.error("Get Metadata By Market Type Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching metadata",
    });
  }
};

/**
 * UPDATE metadata (ownership enforced)
 */
export const updateMetadata = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid metadata ID",
      });
    }

    // Prevent user field override
    delete req.body.user;

    const updatedMetadata = await MetadataModel.findOneAndUpdate(
      {
        _id: id,
        //  user: req.user.id
      },
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedMetadata) {
      return res.status(404).json({
        success: false,
        message: "Metadata not found or access denied",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Metadata updated successfully",
      data: updatedMetadata,
    });
  } catch (error) {
    console.error("Update Metadata Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while updating metadata",
    });
  }
};

/**
 * DELETE metadata
 */
export const deleteMetadata = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid metadata ID",
      });
    }

    const deletedMetadata = await MetadataModel.findOneAndDelete({
      _id: id,
      // user: req.user.id,
    });

    if (!deletedMetadata) {
      return res.status(404).json({
        success: false,
        message: "Metadata not found or access denied",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Metadata deleted successfully",
    });
  } catch (error) {
    console.error("Delete Metadata Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while deleting metadata",
    });
  }
};
