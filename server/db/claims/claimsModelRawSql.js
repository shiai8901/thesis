const Sequelize = require('sequelize');
const db = require('../database.js');
// const User = require('../users/usersModel.js');

const Claim = db.define('claim_raw_sql', {
  id_helper: {
    type: Sequelize.INTEGER
  },
  id_learner: {
    type: Sequelize.INTEGER
  },
  id_question: {
    type: Sequelize.INTEGER
  },
  title: {
    type: Sequelize.STRING
  },
  question: {
    type: Sequelize.TEXT
  },
  status: {
    type: Sequelize.STRING
  },
  deadline: {
    type: Sequelize.DATE
  },
  name: {
    type: Sequelize.STRING
  },
});

// User.hasMany(Question);

// db.sync();

module.exports = Claim;



/*return {
  'id': question.dataValues.id, //
  'title': question.dataValues.title, //
  'question': question.dataValues.question, //
  'status': question.dataValues.status, //
  'deadline': '', //
  'createdAt': question.dataValues.createdAt, //
  'learnerId': question.dataValues.claims[0].id_learner,
  'helperId': question.dataValues.claims[0].id_helper,
  
  //make helpers an array of helpers objects
  'helpers': [{
    helperName: question.dataValues.claims[0].dataValues.user.dataValues.name,
    helperId: question.dataValues.claims[0].dataValues.user.dataValues.id,
  }]
};*/