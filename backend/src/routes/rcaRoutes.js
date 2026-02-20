const express = require("express");
const router = express.Router();
const rcaController = require("../controllers/rcaController");
const logAudit = require("../utils/auditLogger");

router.post("/", rcaController.createRCA);

module.exports = router;
