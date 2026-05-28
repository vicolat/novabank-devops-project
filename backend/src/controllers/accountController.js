const Account = require("../models/Account");

exports.getAccounts = async (req, res) => {
  try {
    const accounts = await Account.findAll();

    res.json({
      success: true,
      data: accounts,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};