//libraries
const express = require("express");

//controllers
const { createUser, loginUser } = require("../controllers/authController.js");

const router = express.Router();

router.post("/createUser", (req, res) => {
  createUser(req, res);
});

router.post("/login", (req, res) => {
  loginUser(req, res);
});

module.exports = router;
