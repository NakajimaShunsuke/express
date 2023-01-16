/* eslint-disable no-undef */
const { validationResult } = require("express-validator");
const mailer = require("../../module/sendmail");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const User = require("../../models").User;

module.exports = (req, res) => {
	// 暗号化につかうキー
	const appKey = process.env.APP_KEY;

	// バリデーション
	const errors = validationResult(req);
	// バリデーションチェック
	if (!errors.isEmpty()) {
		return res.status(422).json({ errors: errors.array() });
	}

	// 送信されたデータ
	const code = req.body.code;
	const name = req.body.name;
	const email = req.body.email;
	const password = req.body.password;

	User.findOrCreate({
		where: { email: email },
		defaults: {
			code: code,
			name: name,
			email: email,
			password: bcrypt.hashSync(password, bcrypt.genSaltSync(8)),
		},
	}).then(([user]) => {
		if (user.emailVerifiedAt) {
			// すでに登録されている時
			return res.status(422).json({
				errors: [
					{
						value: email,
						msg: "すでに登録されています。",
						param: "email",
						location: "body",
					},
				],
			});
		}
		// 本登録URLを作成
		const hash = crypto.createHash("sha1").update(user.email).digest("hex");
		const now = new Date();
		const expiration = now.setHours(now.getHours() + 1); // 1時間だけ有効
		let verificationUrl =
			"http://localhost:3000/" +
			"users/verify/" +
			user.id +
			"/" +
			hash +
			"?expires=" +
			expiration;
		const signature = crypto
			.createHmac("sha256", appKey)
			.update(verificationUrl)
			.digest("hex");
		verificationUrl += "&signature=" + signature;
		mailer.maildev(
			"from@example.com",
			email,
			null,
			null,
			"本登録メール",
			null,
			"以下のURLをクリックして本登録を完了させてください。\n\n" +
				"<a>" +
				verificationUrl +
				"</a>"
		);
		return res.status(200).json({ message: "本登録メール送信" });
	});
};
