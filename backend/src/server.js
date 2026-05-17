require("dotenv").config();

const express = require("express");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");

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
   TEST ROUTE
======================== */
app.get("/", (req, res) => {
  res.send("NovaBank API is running 🚀");
});

/* ========================
   API ROUTES
======================== */
app.use("/", userRoutes);

/* ========================
   START SERVER
======================== */
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});