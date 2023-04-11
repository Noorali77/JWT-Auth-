const { SECRET_KEYS } = require("../database/keys.js");
var jwt = require("jsonwebtoken");

const verify = (req, res, next) => {
  jwt.verify(req.headers.token, SECRET_KEYS, function (err, decoded) {
    if (err) {
      return res.send("Authentication failed");
    }
    next();
  });
};

module.exports = verify;
