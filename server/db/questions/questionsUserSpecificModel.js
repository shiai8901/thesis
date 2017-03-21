const Sequelize = require('sequelize');
const db = require('../database.js');
const User = require('../users/usersModel.js');

const Question = db.define('question', {
  userId: {
    type: Sequelize.INTEGER
  },
  title: {
    type: Sequelize.STRING
  },
  question: {
    type: Sequelize.STRING
  },
  status: {
    type: Sequelize.STRING
  },
  deadline: {
    type: Sequelize.DATE
  }
  // name: { // to display the asker's name in the homepage
  //   type: Sequelize.STRING
  // },
  // id_helper: { // to prevent helper to claim the same Q twice
  //   type: Sequelize.STRING
  // }
  
});

User.hasMany(Question);

db.sync();

module.exports = Question;
