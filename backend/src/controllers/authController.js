const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const Account = require("../models/Account");

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existing = await User.findOne({
      where: { email },
    });

    if (existing) {
      return res.status(400).json({
        error: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    await Account.create({
      UserId: user.id,
      accountNumber:
        "NB" + Math.floor(Math.random() * 1000000000),
      balance: 25000,
    });

    res.json({
      success: true,
      message: "Account created successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      return res.status(400).json({
        error: "User not found",
      });
    }

    const valid = await bcrypt.compare(
      password,
      user.password
    );

    if (!valid) {
      return res.status(400).json({
        error: "Invalid password",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};