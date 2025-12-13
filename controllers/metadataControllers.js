import MetadataModel from "../models/metaDataModel.js";

const createMetadata = async (req, res) => {
  const { market_type, meta_content } = req.body;

  if (!market_type || meta_content)
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

const getAllMetadata = async (req, res) => {
  try {
    const meta_datas = await MetadataModel.find();
    return res.status(200).json({ message: "successfull", data: meta_data });
  } catch (error) {
    console.log("error occured:", error);
    return res
      .status(500)
      .json({ message: "error at readall metadata: ", error });
  }
};

const getMetadataById = async (req, res) => {
  const meta_id = req.params.id;

  if (!meta_id)
    return res
      .status(400)
      .json({ message: "id is required in path parameter" });
  try {
    const meta_datas = await MetadataModel.findOne({ id: meta_id });
    return res.status(200).json({ message: "successfull", data: meta_data });
  } catch (error) {
    console.log("error occured:", error);
    return res
      .status(404)
      .json({ message: "error at readall metadata: ", error });
  }
};

const updateMetadata = async (req, res) => {
  const meta_id = req.params.id;
  const { market_type, meta_content } = req.body;

  if (!market_type || meta_content)
    return res
      .status(400)
      .json({ message: "market_type and meta_content required in req body" });

  if (!meta_id)
    return res
      .status(400)
      .json({ message: "id is required in path parameter" });
  try {
    const meta_datas = await MetadataModel.findOneAndUpdate(
      { id: meta_id },
      { market_type, meta_content }
    );
    return res
      .status(200)
      .json({ message: "updated successfull", data: meta_data });
  } catch (error) {
    console.log("error occured:", error);
    return res
      .status(404)
      .json({ message: "error while updating metadata: ", error });
  }
};

const deleteMetadata = async (req, res) => {
  const meta_id = req.params.id;

  if (!meta_id)
    return res
      .status(400)
      .json({ message: "id is required in path parameter" });
  try {
    const meta_datas = await MetadataModel.findOneAndDelete({ id: meta_id });
    return res.status(200).json({ message: "deleted successfull" });
  } catch (error) {
    console.log("error occured:", error);
    return res
      .status(404)
      .json({ message: "error while deleting metadata: ", error });
  }
};
