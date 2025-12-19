import { fetchHead2Head } from "../services/thirdparty.service.js";

export async function getHead2Head(req, res) {
  try {
    const { teamA_id, teamB_id } = req.query;

    // Validate presence
    if (!teamA_id || !teamB_id) {
      return res.status(400).json({
        message: "teamA_id and teamB_id are required",
      });
    }

    // Convert to numbers
    const teamAId = Number(teamA_id);
    const teamBId = Number(teamB_id);

    // Validate numbers
    if (Number.isNaN(teamAId) || Number.isNaN(teamBId)) {
      return res.status(400).json({
        message: "teamA_id and teamB_id must be valid numbers",
      });
    }

    const head2head = await fetchHead2Head(teamAId, teamBId);

    return res.status(200).json({
      message: "successful",
      data: head2head,
    });
  } catch (error) {
    console.error("Head2Head error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}
