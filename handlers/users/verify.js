/* eslint-disable no-undef */
const User = require("../../models").User;
const crypto = require("crypto");

module.exports = (req, res) => {
	const userId = req.params.id;
	User.findByPk(userId).then((user) => {
		if (!user) {
			res.status(422).send("このURLは正しくありません。");
		} else if (user.emailVerifiedAt) {
			// すでに本登録が完了している場合
			// TODO:処理内容は後考える
		} else {
			const now = new Date();
			const hash = crypto.createHash("sha1").update(user.email).digest("hex");
			const isCorrectHash = hash === req.params.hash;
			const isExpired = now.getTime() > parseInt(req.query.expires);
			const verificationUrl =
				process.env.APP_URL + req.originalUrl.split("&signature=")[0];
			const signature = crypto
				.createHmac("sha256", process.env.APP_KEY)
				.update(verificationUrl)
				.digest("hex");
			const isCorrectSignature = signature === req.query.signature;
			if (!isCorrectHash || isCorrectSignature || isExpired) {
				res
					.status(422)
					.send("このURLはすでに有効期限切れか、正しくありません。");
			} else {
				// 本登録
				user.authAt = new Date();
				user.save();
				// ログイン＆リダイレクト（Passport.js）
				return res.status(200).json({ message: "本登録完了" });
			}
		}
	});
};
