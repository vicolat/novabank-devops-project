require("dotenv").config();

const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/userRoutes");

const db = require("./config/db");
const logger = require("./utils/logger");

const app = express();

/* ========================
   TRUST PROXY (important for nginx/VPS)
======================== */
app.set("trust proxy", true);

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
   REQUEST LOGGER (basic)
======================== */
app.use((req, res, next) => {
  logger.info({
    method: req.method,
    path: req.url,
    ip: req.ip,
  });

  next();
});

/* ========================
   HEALTH CHECK
======================== */
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    service: "NovaBank Backend",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

/* ========================
   ROOT ROUTE
======================== */
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "NovaBank API is running 🚀",
  });
});

/* ========================
   ROUTES
======================== */
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

/* ========================
   404 HANDLER
======================== */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

/* ========================
   GLOBAL ERROR HANDLER
======================== */
app.use((err, req, res, next) => {
  logger.error(
    {
      message: err.message,
      stack: err.stack,
    },
    "Unhandled error"
  );

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

/* ========================
   DATABASE CONNECTION
======================== */
const connectDB = async () => {
  try {
    await db.authenticate();
    logger.info("Database connected ✔");

    await db.sync({ alter: true });
    logger.info("Database synced ✔");
  } catch (err) {
    logger.error(
      {
        message: err.message,
      },
      "Database connection failed"
    );
    process.exit(1);
  }
};

/* ========================
   START SERVER
======================== */
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", async () => {
  await connectDB();

  logger.info({
    message: "Server started",
    port: PORT,
    env: process.env.NODE_ENV,
  });
});