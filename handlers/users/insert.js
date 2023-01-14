const { validationResult } = require("express-validator");

module.exports = (req, res) => {
	// バリデーション
	const errors = validationResult(req);
	// バリデーションチェック
	if (!errors.isEmpty()) {
		return res.status(422).json({ errors: errors.array() });
	}

	// TODO:仮の成功処理
	res.status(200).json({ message: "登録確認" });
};
