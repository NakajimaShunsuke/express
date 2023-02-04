var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/:id", require("../handlers/user/index"));

module.exports = router;
