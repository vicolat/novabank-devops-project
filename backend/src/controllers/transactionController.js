const Transaction = require("../models/Transaction");

exports.getTransactions = async (req, res) => {
  try {
    const transactions =
      await Transaction.findAll();

    res.json({
      success: true,
      data: transactions,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};