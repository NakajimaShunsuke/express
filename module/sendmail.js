/* eslint-disable no-undef */
require("dotenv").config();
const nodemailer = require("nodemailer");

exports.maildev = async (
	from,
	to,
	cc = null,
	bcc = null,
	subject,
	text = null,
	html = null
) => {
	const transporter = nodemailer.createTransport({
		ignoreTLS: true,
		port: process.env.MAIL_PORT,
		secure: JSON.parse(process.env.MAIL_SECURE.toLowerCase()),
	});

	// 引数からメールのデータを作成
	const data = {
		from: from,
		to: to,
		cc: cc,
		bcc: bcc,
		text: text,
		html: html,
		subject: subject,
	};

	await transporter.sendMail(data, (error, info) => {
		if (error) {
			console.log(error); // エラー情報
		} else {
			console.log(info); // 送信したメールの情報
		}
	});
};
