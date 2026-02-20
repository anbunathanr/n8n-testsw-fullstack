const express = require("express");
const router = express.Router();
const verificationController = require("../controllers/verificationController");

router.post("/", verificationController.createVerification);

module.exports = router;
