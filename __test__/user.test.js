/* eslint-disable no-undef */
const request = require("supertest");
const test_data = require("./test_case/user");
const app = require("../app");

describe("Test user root path", () => {
	describe("code validation", () => {
		test("code not is empty operation check", () => {
			// validationでエラーを吐いた時点で422エラーを返す
			return supertest_post(
				test_data.text_case1,
				"code",
				"ユーザーIDは必ず入力してください"
			);
		});
		test("code min length operation check", () => {
			// validationでエラーを吐いた時点で422エラーを返す
			return supertest_post(
				test_data.text_case2,
				"code",
				"ユーザーIDの長さは4以上、20以内です"
			);
		});
		test("code max length operation check", () => {
			// validationでエラーを吐いた時点で422エラーを返す
			return supertest_post(
				test_data.text_case3,
				"code",
				"ユーザーIDの長さは4以上、20以内です"
			);
		});
		test("code Alphanumeric operation check", () => {
			// validationでエラーを吐いた時点で422エラーを返す
			return supertest_post(
				test_data.text_case4,
				"code",
				"ユーザーIDは半角英数字のみ入力可能です"
			);
		});
	});

	describe("name validation", () => {
		test("name n3ot is empty operation check", () => {
			// validationでエラーを吐いた時点で422エラーを返す
			return supertest_post(
				test_data.text_case1,
				"name",
				"ユーザー名は必ず入力してください"
			);
		});
		test("name max length operation check", () => {
			// validationでエラーを吐いた時点で422エラーを返す
			return supertest_post(
				test_data.text_case5,
				"name",
				"ユーザー名の長さは1以上、20以内です"
			);
		});
	});

	describe("email validation", () => {
		test("email not is empty operation check", () => {
			// validationでエラーを吐いた時点で422エラーを返す
			return supertest_post(
				test_data.text_case1,
				"email",
				"メールアドレスは必ず入力してください"
			);
		});
		test("email is email operation check", () => {
			// validationでエラーを吐いた時点で422エラーを返す
			return supertest_post(
				test_data.text_case6,
				"email",
				"メールアドレスを正しく入力してください"
			);
		});
	});

	describe("password validation", () => {
		test("password not is empty operation check", () => {
			// validationでエラーを吐いた時点で422エラーを返す
			return supertest_post(
				test_data.text_case1,
				"password",
				"パスワードは必ず入力してください"
			);
		});
		test("password min length operation check", () => {
			// validationでエラーを吐いた時点で422エラーを返す
			return supertest_post(
				test_data.text_case8,
				"password",
				"パスワードの長さは8以上、20以内です"
			);
		});
		test("password max length operation check", () => {
			// validationでエラーを吐いた時点で422エラーを返す
			return supertest_post(
				test_data.text_case9,
				"password",
				"パスワードの長さは8以上、20以内です"
			);
		});
		test("code Alphanumeric operation check", () => {
			// validationでエラーを吐いた時点で422エラーを返す
			return supertest_post(
				test_data.text_case10,
				"password",
				"パスワードは半角英数字のみ入力可能です"
			);
		});
	});

	// describe("insert 200", () => {
	// 	test("insert 200 check", () => {
	// 		// validationでエラーを吐いた時点で422エラーを返す
	// 		return request(app)
	// 			.post("/users/insert")
	// 			.send(test_data.text_case11)
	// 			.then((response) => {
	// 				console.log(response.body.errors);
	// 				expect(response.statusCode).toBe(200);
	// 			});
	// 	});
	// });
});

function supertest_post(params, filter, conditions) {
	return request(app)
		.post("/users/insert")
		.send(params)
		.then((response) => {
			expect(response.statusCode).toBe(422);
			const res = response.body.errors
				.filter((el) => el.param == filter)
				.map((el) => el.msg);
			expect(res.includes(conditions)).toBe(true);
		});
}
