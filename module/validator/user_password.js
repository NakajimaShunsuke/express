const { check } = require("express-validator");
const message = require("../../bin/message");

module.exports = [
	check("password")
		.not()
		.isEmpty()
		.withMessage(message.AM001("パスワード"))
		.isLength({ min: 8, max: 20 })
		.withMessage(message.AM002("パスワード", 8, 20))
		.isAlphanumeric()
		.withMessage(message.AM003("パスワード"))
		.custom((value, { req }) => {
			// console.log(req.body.passwordConfirmation);
			if (req.body.password !== req.body.passwordConfirmation) {
				throw new Error(message.AM004("パスワード", "パスワード(確認)"));
			}
			return true;
		}),
];
