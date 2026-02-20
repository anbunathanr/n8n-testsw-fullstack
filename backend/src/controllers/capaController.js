const pool = require("../db");
const { v4: uuidv4 } = require("uuid");

exports.createCAPA = async (req, res) => {
  try {
    const { ncr_id, action_plan, assigned_to } = req.body;

    const result = await pool.query(
      `INSERT INTO capa
       (capa_id, ncr_id, action_plan, assigned_to)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [uuidv4(), ncr_id, action_plan, assigned_to]
    );

    res.status(201).json(result.rows[0]);

  } catch (err) {
    console.error("CAPA Error:", err);
    res.status(500).json({ error: "Error creating CAPA" });
  }
};
