const pool = require("../db");

const logAudit = async ({
  entity_type,
  entity_id,
  action,
  old_value = null,
  new_value = null,
  performed_by = null
}) => {
  try {
    await pool.query(
      `INSERT INTO audit_trail
       (entity_type, entity_id, action, old_value, new_value, performed_by)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        entity_type,
        entity_id,
        action,
        old_value ? JSON.stringify(old_value) : null,
        new_value ? JSON.stringify(new_value) : null,
        performed_by
      ]
    );
  } catch (err) {
    console.error("Audit Log Error:", err);
  }
};

module.exports = logAudit;