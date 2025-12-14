import mongoose from "mongoose";

const affiliateLinkSchema = new mongoose.Schema(
  {
    admin_id: { type: mongoose.Types.ObjectId, ref: "admin", required: true },

    link_type: {
      type: String,
      enum: ["nav_bar", "footer"],
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    label: {
      type: String,
      required: true,
    },

    url: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: function (value) {
          return /^https?:\/\/.+/i.test(value);
        },
        message: "Invalid URL format",
      },
    },

    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
  },
  { timestamps: true }
);

const AffiliateLinkModel = mongoose.model("AffiliateLink", affiliateLinkSchema);

export default AffiliateLinkModel;
