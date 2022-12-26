"use strict";
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Users", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			code: {
				allowNull: false,
				unique: true,
				type: Sequelize.STRING(20),
			},
			name: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			password: {
				allowNull: false,
				type: Sequelize.STRING(20),
			},
			email: {
				allowNull: false,
				unique: true,
				type: Sequelize.STRING,
			},
			auth_at: {
				type: Sequelize.DATE,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("Users");
	},
};
