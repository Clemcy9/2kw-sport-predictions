import MetadataModel from "../models/metaDataModel.js";

export const createMetadata = async (req, res) => {
  const { market_type, metadata_content } = req.body;

  if (!market_type || !metadata_content)
    return res
      .status(400)
      .json({ message: "market type and meta contentent required" });

  try {
    const meta_data = await MetadataModel.create({
      market_type,
      metadata_content,
    });
    return res
      .status(201)
      .json({ message: "created successfull", data: meta_data });
  } catch (error) {
    console.log("error occured:", error);
    return res
      .status(500)
      .json({ message: "error at create metadata: ", error });
  }
};

export const getAllMetadata = async (req, res) => {
  try {
    const meta_datas = await MetadataModel.find();
    return res.status(200).json({ message: "successfull", data: meta_datas });
  } catch (error) {
    console.log("error occured:", error);
    return res
      .status(500)
      .json({ message: "error at readall metadata: ", error: error.message });
  }
};

export const getMetadataById = async (req, res) => {
  const meta_id = req.params.id;

  if (!meta_id)
    return res
      .status(400)
      .json({ message: "id is required in path parameter" });

  try {
    const meta_data = await MetadataModel.findOne({ _id: meta_id });

    if (!meta_data)
      return res.status(404).json({ message: "meta_data not exist" });
    return res.status(200).json({ message: "successfull", data: meta_data });
  } catch (error) {
    console.log("error occured:", error);
    return res
      .status(404)
      .json({ message: "error at readall metadata: ", error });
  }
};

export const updateMetadata = async (req, res) => {
  const meta_id = req.params.id;
  const { market_type, metadata_content } = req.body;

  if (!market_type || !metadata_content)
    return res.status(400).json({
      message: "market_type and metadata_content required in req body",
    });

  if (!meta_id)
    return res
      .status(400)
      .json({ message: "id is required in path parameter" });
  try {
    const meta_datas = await MetadataModel.findOneAndUpdate(
      { _id: meta_id },
      { market_type, metadata_content }
    );

    if (!meta_datas)
      return res.status(404).json({ message: "meta_datas not exist" });
    return res
      .status(200)
      .json({ message: "updated successfull", data: meta_datas });
  } catch (error) {
    console.log("error occured:", error);
    return res
      .status(404)
      .json({ message: "error while updating metadata: ", error });
  }
};

export const deleteMetadata = async (req, res) => {
  const meta_id = req.params.id;

  if (!meta_id)
    return res
      .status(400)
      .json({ message: "id is required in path parameter" });
  try {
    const meta_datas = await MetadataModel.findOneAndDelete({ _id: meta_id });

    if (!meta_datas)
      return res.status(404).json({ message: "meta_datas not exist" });
    return res.status(200).json({ message: "deleted successfull" });
  } catch (error) {
    console.log("error occured:", error);
    return res
      .status(404)
      .json({ message: "error while deleting metadata: ", error });
  }
};
