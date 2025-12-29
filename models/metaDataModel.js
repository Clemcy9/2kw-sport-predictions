import mongoose from "mongoose";

const metadataSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "user", required: true },

    market_type: {
      type: String,
      required: true,
      enum: [
        "freeTip",
        "superSingleTip",
        "freeOdds",
        "surePredict",
        "match winner",
        "double chance",
        "over and Under",
      ],
    },
    page_title: String,
    page_description: String,
    page_keywords: String,
    header_content: String,
    header_sub_content: String,

    metadata_content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const MetadataModel = mongoose.model("Metadata", metadataSchema);

export default MetadataModel;
