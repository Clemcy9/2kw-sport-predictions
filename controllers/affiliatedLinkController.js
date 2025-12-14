import mongoose from "mongoose";
import AffiliateLinkModel from "../models/affiliateLinkModel.js";
// import AffiliateLinkModel from "../models/AffiliateLink.js";

/**
 * CREATE
 * POST /api/v1/affiliatelinks
 */
export const createAffiliateLink = async (req, res) => {
  try {
    const { link_type, location, label, url, status } = req.body;

    if (!link_type || !location || !label || !url) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    const affiliateLink = await AffiliateLinkModel.create({
      admin_id: req.user.id,
      link_type,
      location,
      label,
      url,
      status,
    });

    return res.status(201).json({
      message: "Affiliate link created successfully",
      data: affiliateLink,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

/**
 * READ ALL
 * GET /api/v1/affiliatelinks
 */
export const getAllAffiliateLinks = async (req, res) => {
  try {
    const links = await AffiliateLinkModel.find({
      admin_id: req.user.id,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Affiliate links fetched successfully",
      count: links.length,
      data: links,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

/**
 * READ ONE
 * GET /api/v1/affiliatelinks/:id
 */
export const getAffiliateLinkById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const link = await AffiliateLinkModel.findOne({
      _id: id,
      admin_id: req.user.id,
    });

    if (!link) {
      return res.status(404).json({
        message: "Affiliate link not found",
      });
    }

    return res.status(200).json({
      message: "Affiliate link fetched successfully",
      data: link,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

/**
 * UPDATE
 * PUT /api/v1/affiliatelinks/:id
 */
export const updateAffiliateLink = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const updatedLink = await AffiliateLinkModel.findOneAndUpdate(
      { _id: id, admin_id: req.user.id },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedLink) {
      return res.status(404).json({
        message: "Affiliate link not found",
      });
    }

    return res.status(200).json({
      message: "Affiliate link updated successfully",
      data: updatedLink,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

/**
 * DELETE
 * DELETE /api/v1/affiliatelinks/:id
 */
export const deleteAffiliateLink = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const deleted = await AffiliateLinkModel.findOneAndDelete({
      _id: id,
      admin_id: req.user.id,
    });

    if (!deleted) {
      return res.status(404).json({
        message: "Affiliate link not found",
      });
    }

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
