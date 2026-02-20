const pool = require("../db");
const { v4: uuidv4 } = require("uuid");
const logAudit = require("../utils/auditLogger");

exports.createRCA = async (req, res) => {
  try {
    const { ncr_id, root_cause, corrective_action, submitted_by } = req.body;

    if (!ncr_id || !root_cause || !corrective_action || !submitted_by) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Insert RCA
    const rcaResult = await pool.query(
      `INSERT INTO rca 
       (rca_id, ncr_id, root_cause, corrective_action, submitted_by)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [uuidv4(), ncr_id, root_cause, corrective_action, submitted_by]
    );

    // Update NCR status
const ncrUpdate = await pool.query(
  `UPDATE ncr 
   SET status = 'QC_Review',
       updated_at = NOW()
   WHERE ncr_id = $1
   RETURNING *`,
  [ncr_id]
);

    if (ncrUpdate.rows.length === 0) {
      return res.status(404).json({ error: "NCR not found" });
    }

    res.status(201).json({
      message: "RCA submitted successfully",
      rca: rcaResult.rows[0]
    });

  } catch (err) {
    console.error("RCA Error:", err);
    res.status(500).json({ error: "Error submitting RCA" });
  }
};
