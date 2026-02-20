const pool = require("../db");
const { v4: uuidv4 } = require("uuid");

exports.createFMEA = async (req, res) => {
  try {
    const { ncr_id, failure_mode, severity, occurrence, detection } = req.body;

    const rpn = severity * occurrence * detection;

    const result = await pool.query(
      `INSERT INTO fmea
       (fmea_id, ncr_id, failure_mode, severity, occurrence, detection, rpn)
       VALUES ($1,$2,$3,$4,$5,$6,$7)
       RETURNING *`,
      [uuidv4(), ncr_id, failure_mode, severity, occurrence, detection, rpn]
    );

    res.status(201).json(result.rows[0]);

  } catch (err) {
    console.error("FMEA Error:", err);
    res.status(500).json({ error: "Error creating FMEA" });
  }
};
