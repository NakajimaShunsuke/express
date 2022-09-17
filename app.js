// const createError = require("http-errors");
const express = require("express");
const logger = require("morgan");
const message = require("./bin/message");
const connection = require("./bin/connection");

// Router
const indexRouter = require("./routes/index");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res) {
	return res.status(404).json({ message: message.E404(), path: req.path });
});

connection.connect(function (err) {
	if (err) throw err;
	console.log("Connected");
});

module.exports = app;
