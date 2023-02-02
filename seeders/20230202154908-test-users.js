"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('People', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		 */
		const now = new Date();
		return queryInterface.bulkInsert(
			"Users",
			[
				{
					userId: "taroId",
					name: "太郎",
					email: "taro@example.com",
					createdAt: now,
					updatedAt: now,
				},
				{
					userId: "jiroId",
					name: "次郎",
					email: "jiro@example.com",
					createdAt: now,
					updatedAt: now,
				},
				{
					userId: "saburoId",
					name: "三郎",
					email: "saburo@example.com",
					createdAt: now,
					updatedAt: now,
				},
				{
					userId: "shiroId",
					name: "四郎",
					email: "shiro@example.com",
					createdAt: now,
					updatedAt: now,
				},
				{
					userId: "goroId",
					name: "五郎",
					email: "goro@example.com",
					createdAt: now,
					updatedAt: now,
				},
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
		return queryInterface.bulkDelete("Users", null, {});
	},
};
