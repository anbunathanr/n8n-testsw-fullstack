const express = require("express");
const cors = require("cors");
const rcaRoutes = require("./routes/rcaRoutes");
const ncrRoutes = require("./routes/ncrRoutes");
const capaRoutes = require("./routes/capaRoutes");
const fmeaRoutes = require("./routes/fmeaRoutes");
const verificationRoutes = require("./routes/verificationRoutes");
const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:3000"
}));
app.use(express.json());

// Routes
app.use("/api/ncr", ncrRoutes);
app.use("/api/rca", rcaRoutes);
app.use("/api/capa", capaRoutes);
app.use("/api/fmea", fmeaRoutes);
app.use("/api/verification", verificationRoutes); 


// Health check
app.get("/", (req, res) => {
  res.send("QMS Backend Running 🚀");
});

module.exports = app;
