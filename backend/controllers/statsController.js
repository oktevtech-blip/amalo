import db from "../config/db.js";

export const getStats = async (req, res) => {
  try {
    const [stats] = await db.query(
      "SELECT * FROM stats ORDER BY stat_id ASC"
    );

    res.status(200).json(stats);
  } catch (error) {
    console.error("Get stats error:", error);

    res.status(500).json({
      message: "Failed to fetch stats",
    });
  }
};

export const updateStat = async (req, res) => {
  try {
    const { id } = req.params;
    const { value, label } = req.body;

    const [result] = await db.query(
      `UPDATE stats
       SET
        value = ?,
        label = ?
       WHERE stat_id = ?`,
      [value, label, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Stat not found",
      });
    }

    res.status(200).json({
      message: "Stat updated successfully",
    });
  } catch (error) {
    console.error("Update stat error:", error);

    res.status(500).json({
      message: "Failed to update stat",
    });
  }
};