import { fetchHead2Head } from "../services/thirdparty.service";

export async function getHead2Head(req, res) {
  try {
    const { teamA_id, teamB_id } = req.query;

    if (!teamA_id || !teamB_id) {
      return res.status(400).json({
        message: "teamA_id and teamB_id are required",
      });
    }

    const head2head = await fetchHead2Head(teamA_id, teamB_id);

    res.status(200).json({
      message: "successful",
      data: head2head,
    });
  } catch (error) {
    res.status(500).json({
      message: "error occurred",
      error: error.message,
    });
  }
}


