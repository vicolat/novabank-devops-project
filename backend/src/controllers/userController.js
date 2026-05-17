const userService = require("../services/userService");

const getUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    console.error("DB ERROR:", error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

module.exports = {
  getUsers,
};