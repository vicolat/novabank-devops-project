const express = require("express");
const auth = require("../middleware/authMiddleware");
const User = require("../models/User");

const router = express.Router();

/* ========================
   PROTECTED ROUTE
======================== */
router.get("/", auth, async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "email"],
    });

    res.json({
      success: true,
      message: "Users fetched successfully",
      data: users,
      requestedBy: req.user,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;