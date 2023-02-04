// const createError = require("http-errors");
require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const message = require("./bin/message");

// Router
const indexRouter = require("./routes/index");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ルーティング一覧
app.use("/", indexRouter);
app.use("/user", require("./routes/user"));

// catch 404 and forward to error handler
app.use(function (req, res) {
	return res.status(404).json({ message: message.E404(), path: req.path });
});

module.exports = app;
