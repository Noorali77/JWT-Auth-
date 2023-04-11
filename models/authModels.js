const database = require("../database/index.js");

const createQuery = (email, password) => {
  const sql = "INSERT INTO users (email, password) VALUES (?)";
  const values = [email, password];
  database.query(sql, [values], function (err, result) {
    if (err) throw err;
    console.log("User Added");
  });
};

const checkUserQuery = (email) => {
  const sql = `SELECT email FROM users where email = "${email}"`;
  return new Promise((resolve, reject) => {
    database.query(sql, function (err, result) {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const loginQuery = (email,password) => {
  const sql = `SELECT * FROM users where email = "${email}" And password = ${password}`;
  return new Promise((resolve, reject) => {
    database.query(sql, function (err, result) {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

module.exports = {
  createQuery,
  checkUserQuery,
  loginQuery,
};
