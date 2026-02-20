const pool = require("../db");
const { v4: uuidv4 } = require("uuid");

exports.createVerification = async (req, res) => {
  try {
    const { ncr_id, verification_summary, verified_by, verification_result } = req.body;

    const result = await pool.query(
      `INSERT INTO verification
       (verification_id, ncr_id, verification_summary, verified_by, verification_result)
       VALUES ($1,$2,$3,$4,$5)
       RETURNING *`,
      [uuidv4(), ncr_id, verification_summary, verified_by, verification_result]
    );

    // Move NCR to Closed if pass
    if (verification_result === "Pass") {
      await pool.query(
        `UPDATE ncr
         SET status = 'Closed',
             updated_at = NOW()
         WHERE ncr_id = $1`,
        [ncr_id]
      );
    }

    res.status(201).json(result.rows[0]);

  } catch (err) {
    console.error("Verification Error:", err);
    res.status(500).json({ error: "Verification failed" });
  }
};
