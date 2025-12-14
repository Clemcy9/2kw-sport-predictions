import mongoose from "mongoose";

const metadataSchema = new mongoose.Schema(
  {
    admin_id: { type: mongoose.Types.ObjectId, ref: "admin", required: true },

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

    metadata_content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const MetadataModel = mongoose.model("Metadata", metadataSchema);

export default MetadataModel;
