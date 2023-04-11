//libraries
const express = require("express");
const bodyParser = require("body-parser");

//middleware
const verify = require("./middlewares/auth.js");

//database
require("./database/index.js");

//nodejs
const path = require("path");

//routes
const auth = require("./routes/auth.js");
const todo = require("./routes/todo.js");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(process.cwd(), "public")));

app.set("view engine", "ejs");
app.set("views", "views");

app.use("/auth", auth);
app.use("/todo", verify, todo);

app.listen(5000, () => console.log("Server is Running!!"));
