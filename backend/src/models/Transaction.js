const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Transaction = sequelize.define("Transaction", {
  type: {
    type: DataTypes.STRING,
  },

  amount: {
    type: DataTypes.FLOAT,
  },

  description: {
    type: DataTypes.STRING,
  },
});

module.exports = Transaction;