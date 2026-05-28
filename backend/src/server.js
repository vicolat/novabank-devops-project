require("dotenv").config();

const express = require("express");
const cors = require("cors");

const sequelize = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const accountRoutes = require("./routes/accountRoutes");
const transactionRoutes = require("./routes/transactionRoutes");

const User = require("./models/User");
const Account = require("./models/Account");
const Transaction = require("./models/Transaction");

const logger = require("./utils/logger");

const app = express();

/* =========================
   MIDDLEWARE
========================= */

app.use(cors());

app.use(express.json());

/* =========================
   MODEL RELATIONSHIPS
========================= */

User.hasMany(Account);
Account.belongsTo(User);

Account.hasMany(Transaction);
Transaction.belongsTo(Account);

/* =========================
   HEALTH CHECK
========================= */

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    service: "NovaBank Backend",
    timestamp: new Date(),
  });
});

/* =========================
   ROOT ROUTE
========================= */

app.get("/", (req, res) => {
  res.send("NovaBank API Running 🚀");
});

/* =========================
   ROUTES
========================= */

app.use("/api/auth", authRoutes);

app.use("/api/accounts", accountRoutes);

app.use("/api/transactions", transactionRoutes);

/* =========================
   DATABASE + SERVER
========================= */

sequelize
  .sync({ alter: true })
  .then(() => {
    logger.info("Database synced ✔");

    app.listen(process.env.PORT || 5000, "0.0.0.0", () => {
      logger.info(
        `Server running on port ${
          process.env.PORT || 5000
        }`
      );
    });
  })
  .catch((err) => {
    logger.error(err);
  });