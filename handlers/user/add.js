const { validationResult } = require("express-validator");
const User = require("../../models").User;

module.exports = async (req, res) => {
	// バリデーションチェック
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).json({ errors: errors.array() });
	}

	// 送信されたデータ
	const userId = req.body.userId;
	const name = req.body.name;
	const email = req.body.email;

	User.create({
		userId: userId,
		name: name,
		email: email,
	})
		.then((user) => {
			return res.status(200).json({
				data: user,
				message: "アカウント情報登録しました",
			});
		})
		.catch((err) => {
			return res.status(500).json({
				error_path: err.errors[0].path,
				error_type: err.errors[0].type,
				error_message: err.errors[0].message,
			});
		});
};
