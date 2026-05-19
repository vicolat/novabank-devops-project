const express = require("express");
const router = express.Router();
const db = require("../config/db");

// TEST route first (safe)
router.get("/", async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: []
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
});

module.exports = router;