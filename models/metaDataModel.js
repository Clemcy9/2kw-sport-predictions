import mongoose from "mongoose";

const metadataSchema = new mongoose.Schema(
  {
    admin_id: { type: mongoose.Types.ObjectId, ref: "admin" },

    header_sub_content: {
      type: String,
      required: true,
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
