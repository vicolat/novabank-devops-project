const router = require("express").Router();

const auth = require("../middleware/authMiddleware");

const {
  getAccounts,
} = require("../controllers/accountController");

router.get("/", auth, getAccounts);

module.exports = router;