const User = require("../../models").User;

module.exports = async (req, res) => {
	const userId = req.params.id;
	const rows = await User.findAll({
		where: {
			userId: userId,
		},
	});
	res.json(rows);
};
