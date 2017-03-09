const db = require('../database.js');
const Review = require('./reviewsModel.js');
const User = require('../users/usersModel.js');
const Collaborate = require('../collaborate/collaborateModel.js');

const controller = {
	save: function(req, res, next) {
		console.log('saving review ------------> ', req.body);
		Review.create({
			id_helper: req.body.id_helper,
			id_learner: req.body.id_learner,
			content: req.body.content,
			knowledge: req.body.knowledge,
			helpfulness: req.body.helpfulness,
			overall: req.body.overall,
			experience: req.body.experience,
			id_collaborate: req.body.id_collaborate
		})
		.then(function(task) {
			task.save();
			res.status(200).send("Reivew successfully saved.");
		})
		.catch(function(err) {
			console.log("review table error", err.message);
			res.status(500).send("Having trouble saving reviews, please try again.");
		});
	},

	retrieveAll: function(req, res, next) {
		Review.findAll()
		.then(function(reviews) {
			res.json(reviews);
		})
		.catch(function(err) {
			console.log('err in findAll reviews');
		});
	},

	retrieveAllByUserId: function(req, res, next) {
		console.log('retrieving reviews ------------> ', req.params);
		Review.findAll({
			where: {id_helper: req.params.id}
		})
		.then(function(reviews) {
			console.log('reviews -----------> ', reviews);
			res.json(reviews);
		})
		.catch(function(err) {
			console.log('error in retrieveAllByUserId ----------> ', err.message);
		});

	}
}

module.exports = controller;
