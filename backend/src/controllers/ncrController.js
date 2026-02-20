const pool = require("../db");
const { v4: uuidv4 } = require("uuid");
const axios = require("axios");
const logAudit = require("../utils/auditLogger");

/* =====================================================
   CREATE NCR
===================================================== */
exports.createNCR = async (req, res) => {
  try {
    const {
      ncr_number,
      issue_id,
      ncr_description,
      severity_level,
      business_impact,
      cost_impact,
      created_by
    } = req.body;

    const result = await pool.query(
      `INSERT INTO ncr
       (ncr_id, ncr_number, issue_id, ncr_description,
        severity_level, business_impact, cost_impact, created_by)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
       RETURNING *`,
      [
        uuidv4(),
        ncr_number,
        issue_id,
        ncr_description,
        severity_level,
        business_impact,
        cost_impact,
        created_by
      ]
    );

    const newNCR = result.rows[0];

    // 🔥 Trigger n8n webhook (do not break if fails)
    try {
      await axios.post(
        "https://n8n.digitransolutions.in/webhook/ncr-valid-trigger",
        {
          event: "NCR_CREATED",
          data: newNCR
        }
      );
    } catch (webhookError) {
      console.error("n8n Webhook Error:", webhookError.message);
    }

    res.status(201).json(newNCR);

  } catch (err) {
    console.error("Create NCR Error:", err);
    res.status(500).json({ error: "Error creating NCR" });
  }
};


/* =====================================================
   GET ALL NCRs
===================================================== */
exports.getAllNCRs = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM ncr ORDER BY created_at DESC"
    );
    res.json(result.rows);

  } catch (err) {
    console.error("Fetch NCRs Error:", err);
    res.status(500).json({ error: "Error fetching NCRs" });
  }
};


/* =====================================================
   GET SINGLE NCR
===================================================== */
exports.getNCRById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT * FROM ncr WHERE ncr_id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "NCR not found" });
    }

    res.json(result.rows[0]);

  } catch (err) {
    console.error("Fetch NCR Error:", err);
    res.status(500).json({ error: "Error fetching NCR" });
  }
};


/* =====================================================
   UPDATE NCR STATUS
===================================================== */
exports.updateNCR = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const oldNCR = await pool.query(
      "SELECT * FROM ncr WHERE ncr_id = $1",
      [id]
    );

    if (oldNCR.rows.length === 0) {
      return res.status(404).json({ error: "NCR not found" });
    }

    const result = await pool.query(
      `UPDATE ncr
       SET status = $1,
           updated_at = NOW()
       WHERE ncr_id = $2
       RETURNING *`,
      [status, id]
    );

    const newData = result.rows[0];

    // 🔥 Audit log
    await logAudit({
      entity_type: "NCR",
      entity_id: id,
      action: "STATUS_UPDATED",
      old_value: { status: oldNCR.rows[0].status },
      new_value: { status: newData.status },
      performed_by: null
    });

    res.json(newData);

  } catch (err) {
    console.error("Update NCR Error:", err);
    res.status(500).json({ error: "Error updating NCR" });
  }
};


/* =====================================================
   DELETE NCR
===================================================== */
exports.deleteNCR = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query(
      "DELETE FROM ncr WHERE ncr_id = $1",
      [id]
    );

    res.json({ message: "NCR deleted successfully" });

  } catch (err) {
    console.error("Delete NCR Error:", err);
    res.status(500).json({ error: "Error deleting NCR" });
  }
};
