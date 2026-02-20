const express = require("express");
const router = express.Router();
const fmeaController = require("../controllers/fmeaController");

router.post("/", fmeaController.createFMEA);

module.exports = router;
