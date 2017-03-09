const Sequelize = require('sequelize');
const db = require('../database.js');
const User = require('../users/usersModel.js');
const Question = require('../questions/questionsUserSpecificModel.js');
const Claim = require('../claims/claimsModel.js');
const Review = require('../reviews/reviewsModel.js');

const Collaborate = db.define('collaborate', {
  room_number: {
    type: Sequelize.STRING
  }
});

Collaborate.belongsTo(User, {foreignKey: 'id_learner', as: 'Learner'});
Collaborate.belongsTo(User, {foreignKey: 'id_helper', as: 'Helper'});
Collaborate.belongsTo(Question, {foreignKey: 'id_question', as: 'Question'});
// Collaborate.belongsTo(Review, {foreignKey: 'id_review', as: 'Review'});
Review.belongsTo(Collaborate, {foreignKey: 'id_collaborate', as: 'Collaborate'});

db.sync()
// .then(function() {
//   return Collaborate.create({
//       id_learner: 1,
//       id_helper: 2,
//       id_question: 1,
//       room_number: '1234',
//       id_review: 1
//     })  
// })
// .then(function() {
//   Collaborate.findAll({
//     include: [{model: User, as: 'Learner', attributes: ['name']}, {model: User, as: 'Helper', attributes: ['name']}, {model: Question, as: 'Question', attributes: ['title','question']}]
//   })
//     .then(function(collaborates) {
//       collaborates.forEach(function(collaborate) {
//         console.log(collaborate.get());
//       })
//       console.log("************ create collaborate successfully *************")
//     });
//     // res.status(200).send('Session successfully saved');
// })
.catch(function(err) {
  console.log('Error saving collaborate', err.message);
  // res.sendStatus(500);
});

module.exports = Collaborate;





