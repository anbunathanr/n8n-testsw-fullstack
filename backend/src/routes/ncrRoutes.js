const express = require("express");
const router = express.Router();
const pool = require("../db");
const ncrController = require("../controllers/ncrController");

// Create NCR
router.post("/", ncrController.createNCR);

// Get all
router.get("/", ncrController.getAllNCRs);

// Get single
router.get("/:id", ncrController.getNCRById);

// Update status
router.put("/:id", ncrController.updateNCR);

// Get audit trail
router.get("/:id/audit", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM audit_trail WHERE entity_id = $1 ORDER BY performed_at DESC",
      [req.params.id]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Error fetching audit trail" });
  }
});

// Delete
router.delete("/:id", ncrController.deleteNCR);

module.exports = router;
