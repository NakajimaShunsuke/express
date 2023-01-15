const express = require("express");
const router = express.Router();

// バリデーションに必要なモジュール
const Validator = require("../module/validator/users");
const ValidatorPass = require("../module/validator/user_password");

// 各ハンドラー
const insert = require("../handlers/users/insert");
const verify = require("../handlers/users/verify");

// insert
router.post("/insert", [Validator, ValidatorPass], insert);
// insert
router.get("/verify/:id/:hash", verify);

module.exports = router;
