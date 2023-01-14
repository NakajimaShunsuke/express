const sendMail = require("../../module/sendmail");

// メール送信モジュール実行確認
sendMail.maildev(
	'"administrator" <administrator@example.com>',
	"bar@example.com",
	null,
	null,
	"Hello",
	"Hello world?"
);
