const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Account = sequelize.define("Account", {
  accountNumber: {
    type: DataTypes.STRING,
    unique: true,
  },

  balance: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
});

module.exports = Account;