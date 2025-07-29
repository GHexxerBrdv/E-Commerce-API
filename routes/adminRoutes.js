const express = require("express");
const {adminAnalytics} = require("../controllers/adminController");
const protect = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/analytics", protect, isAdmin, adminAnalytics)

module.exports = router;