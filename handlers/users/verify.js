/* eslint-disable no-undef */
const User = require("../../models").User;
const crypto = require("crypto");

module.exports = (req, res) => {
	const userId = req.params.id;
	User.findByPk(userId).then((user) => {
		if (!user) {
			res.status(422).json({
				value: "URL",
				msg: "このURLは正しくありません。",
				param: "url",
				location: "body",
			});
		} else if (user.emailVerifiedAt) {
			// すでに本登録が完了している場合
			return res.status(422).json({
				errors: [
					{
						value: "URL",
						msg: "このURLはすでに有効期限切れか、正しくありません。",
						param: "url",
						location: "body",
					},
				],
			});
		} else {
			const now = new Date();

			// 送られてきたメールアドレスが正しいか判定
			const hash = crypto.createHash("sha1").update(user.email).digest("hex");
			const isCorrectHash = hash === req.params.hash;

			//１時間以内に閲覧されているかを判定
			const isExpired = now.getTime() > parseInt(req.query.expires);

			// 電子署名がされたURLかを判定
			const verificationUrl =
				process.env.APP_URL + req.originalUrl.split("&signature=")[0];
			const signature = crypto
				.createHmac("sha256", process.env.APP_KEY)
				.update(verificationUrl)
				.digest("hex");
			const isCorrectSignature = signature === req.query.signature;

			if (!isCorrectHash || isCorrectSignature || isExpired) {
				return res.status(422).json({
					errors: [
						{
							value: "URL",
							msg: "このURLはすでに有効期限切れか、正しくありません。",
							param: "url",
							location: "body",
						},
					],
				});
			} else {
				// 本登録
				user.authAt = new Date();
				user.save();
				return res.status(200).json({ message: "本登録完了" });
			}
		}
	});
};
