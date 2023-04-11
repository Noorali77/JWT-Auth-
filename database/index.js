const mysql = require("mysql");

const database = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "todo",
});

database.connect(function (err) {
  if (err) throw err;
  console.log("Database Connected!");
});

module.exports = database;
