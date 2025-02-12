const express = require("express");
// const { authenticateToken } = require("../middleware/authMiddleware");
const {
  signupTeller,
  loginTeller,
  logoutTeller,
} = require("../controllers/TellerController");

const routes = express.Router();

routes.post("/signup", signupTeller);
routes.post("/login", loginTeller);
routes.post("/logout", logoutTeller);

module.exports = routes;
