const { check } = require("express-validator");
const message = require("../../bin/message");

module.exports = [
	check("userId")
		.not()
		.isEmpty()
		.withMessage(message.AM001("ユーザーID"))
		.isAlphanumeric()
		.withMessage(message.AM003("ユーザーID")),
	check("name")
		.not()
		.isEmpty()
		.withMessage(message.AM001("ユーザー名"))
		.isLength({ min: 1, max: 20 })
		.withMessage(message.AM002("ユーザー名", 1, 20)),
	check("email")
		.not()
		.isEmpty()
		.withMessage(message.AM001("メールアドレス"))
		.isEmail()
		.withMessage(message.AM005("メールアドレス")),
];
