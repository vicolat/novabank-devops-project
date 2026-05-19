require("dotenv").config();

const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/userRoutes");

const db = require("./config/db");
const logger = require("./utils/logger"); // 👈 ADD THIS

const app = express();

/* ========================
   MIDDLEWARE
======================== */
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    credentials: true,
  })
);

app.use(express.json());

/* ========================
   HEALTH CHECK (NEW 🔥)
======================== */
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    service: "NovaBank Backend",
    uptime: process.uptime(),
  });
});

/* ========================
   TEST ROUTE
======================== */
app.get("/", (req, res) => {
  res.send("NovaBank API is running 🚀");
});

/* ========================
   ROUTES
======================== */
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

/* ========================
   DATABASE CONNECTION
======================== */
db.authenticate()
  .then(() => logger.info("Database connected ✔"))
  .catch((err) => logger.error(err, "DB connection error"));

/* ========================
   AUTO TABLE SYNC (DEV MODE)
======================== */
db.sync({ alter: true })
  .then(() => logger.info("Database synced ✔"))
  .catch((err) => logger.error(err, "DB sync error"));

/* ========================
   START SERVER
======================== */
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  logger.info(`Server running on port ${PORT}`);
});