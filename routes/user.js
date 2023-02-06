var express = require("express");
var router = express.Router();

// バリデーションに必要なモジュール
const Validator = require("../module/validator/user");

/* GET home page. */
router.get("/:id", require("../handlers/user/index"));
// add
router.post("/add", [Validator], require("../handlers/user/add"));

module.exports = router;
