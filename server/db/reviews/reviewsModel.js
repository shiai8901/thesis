const Sequelize = require('sequelize');
const db = require('../database.js');
const User = require('../users/usersModel.js');
const Question = require('../questions/questionsModel.js');
const Claim = require('../claims/claimsModel.js');
const Collaborate = require('../collaborate/collaborateModel.js');

const Review = db.define('review', {
	id_helper: {
		type: Sequelize.INTEGER
	},
	id_learner: {
		type: Sequelize.INTEGER
	},
	knowledge: {
		type: Sequelize.INTEGER
	},
	helpfulness: {
		type: Sequelize.INTEGER
	},
	overall: {
		type: Sequelize.INTEGER
	},
	content: {
		type: Sequelize.TEXT
	},
	experience: {
		type: Sequelize.INTEGER
	}
});

// Review.belongsTo(Collaborate, {foreignKey: 'id_collaborate', as: 'Collaborate'});

db.sync()
// .then(function() {
// 	Review.findAll({
// 		where: {id_helper: 6}
// 	})
// 	.then(function(reviews) {
// 		console.log('reviews -----------> ', reviews);
// 	})
// 	.catch(function(err) {
// 		console.log(err.message);
// 	})
// })
// .then(function() {
// 	return Review.create({
// 		knowledge: 5,
// 		helpfulness: 5,
// 		overall: 5,
// 		content: 'good helper',
// 		id_collaborate: 1,
// 	})
// 	console.log("model has been made")
// })
.catch(function(err) {
	console.log("err in review model", err.message);
});
module.exports = Review;