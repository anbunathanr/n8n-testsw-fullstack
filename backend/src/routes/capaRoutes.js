const express = require("express");
const router = express.Router();
const capaController = require("../controllers/capaController");

router.post("/", capaController.createCAPA);

module.exports = router;
