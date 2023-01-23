// 定型文を呼び出すモジュール
exports.E404 = function () {
	return `ページが見つかりません`;
};

// validator定型文 メッセージコード：AM
exports.AM001 = function (text_value) {
	return `${text_value}は必ず入力してください`;
};

exports.AM002 = function (text_value, min, max) {
	return `${text_value}の長さは${min}以上、${max}以内です`;
};

exports.AM003 = function (text_value) {
	return `${text_value}は半角英数字のみ入力可能です`;
};

exports.AM004 = function (text_value, text_value2) {
	return `${text_value}は${text_value2}と一致しません`;
};

exports.AM005 = function (text_value) {
	return `${text_value}を正しく入力してください`;
};

exports.ST401 = function () {
	return `認証に失敗しました`;
};

exports.ST403 = function () {
	return `アクセスする権利がありません`;
};
