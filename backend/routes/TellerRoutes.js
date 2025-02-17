const express = require("express");
// const { authenticateToken } = require("../middleware/authMiddleware");
const {
  signupTeller,
  loginTeller,
  logoutTeller,
  checkWindowNoAvailability,
} = require("../controllers/TellerController");

const routes = express.Router();

routes.post("/signup", signupTeller);
routes.post("/login", loginTeller);
routes.put("/logout", logoutTeller);
routes.post("/checkWindowNo", checkWindowNoAvailability);

module.exports = routes;
