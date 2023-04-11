//libraries
const validator = require("validator");
const jwt = require("jsonwebtoken");

//keys
const { SECRET_KEYS } = require("../database/keys.js");

//models
const {
  createQuery,
  checkUserQuery,
  loginQuery,
} = require("../models/authModels.js");

const createUser = async (req, res) => {
  const isEmailValidate = validator.isEmail(req.body.email);
  if (!isEmailValidate) {
    res.send({ message: "Invalid Email Address!" });
    return false;
  }
  if (req.body.password.length <= 5) {
    res.send({ message: "Password must contain atleast 6 characters!" });
    return false;
  }

  const user = await checkUserQuery(req.body.email);

  if (user.length != 0) {
    res.send({ message: "Email is Already Taken!" });
    return false;
  }
  createQuery(req.body.email, req.body.password);
  res.send({ message: "User Created!" });
};

const loginUser = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const validateUser = await loginQuery(email, password);

  if (
    validateUser.length > 0 &&
    validateUser[0].email == email &&
    validateUser[0].password == password
  ) {
    var accessToken = await jwt.sign({ email }, SECRET_KEYS, {
      expiresIn: "1h",
    });
    req.headers.token = accessToken;
    res.send({ message: "Authenticate!", token: accessToken });
  } else {
    res.send({ message: "Invalid Email or Password!" });
  }
};

module.exports = {
  createUser,
  loginUser,
};
