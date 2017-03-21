const db = require('../database.js'); //for raw sql query
const Claim = require('./claimsModel.js');
const ClaimRawSql = require('./claimsModelRawSql.js');
const Question = require('../questions/questionsUserSpecificModel.js');
const User = require('../users/usersModel.js');

const controller = {
  
  save: function(req, res, next) {
    Claim.create({
      id_helper: req.body.id_helper,
      id_learner: req.body.id_learner,
      id_question: req.body.id_question,
    })
    .then(function(task) {
      task.save();
      
      //Change the question status to claimed
      Question.findOne({ 
        where: {
          id: req.body.id_question} })
        .then(function(question) {
          // console.log('change question status in', question);
          if (question) {
            question.updateAttributes({
              status: 'claimed'
            })
            .then(function() {
              return res.status(200).send('========== Success saving Claim');
            });
          }
        }); //---- end change question status to claimed
      
    })
    .catch(function(err) {
      console.log(err, 'Error saving claim');
      return res.sendStatus(500);
    });
  },
  retrieve: function(req, res, next) {
    
    // console.log('XXX calling claimController retrieve with userId:', req.query.userId);
    var currentUserId = req.query.userId;


/*This sequelize query is working: */
    // Question.hasMany(Claim, {foreignKey: 'id_question'});
    // Claim.belongsTo(User, {foreignKey: 'id_helper'});

    // Question.findAll({ where: {
    //   $and: [{userId: currentUserId}, {status: 'claimed'}]
    //   }, 

    //   include: [
    //     {
    //       model: Claim, 
    //       include: [
    //         User
    //       ]  
    //     }
    //   ]
    db.query('SELECT id_helper, id_question, id_learner, questions.title, questions.question, questions.status, questions.deadline, questions."createdAt", helper.name FROM claims\
      INNER JOIN questions ON questions.id = claims.id_question\
      INNER JOIN users AS helper ON helper.id = id_helper\
      WHERE questions.status = \'claimed\' AND claims.id_learner = ? ', { model: ClaimRawSql, replacements: [currentUserId], type: db.QueryTypes.SELECT })
    .then(function(questions) {
      // console.log('========== Success getting claimed questions', questions[0].dataValues);
      var promises = questions.map(function(question) {
        // console.log('XXX each question.dataValues.claims', question);
        return {
          'id': question.dataValues.id_question,
          'title': question.dataValues.title,
          'question': question.dataValues.question,
          'status': question.dataValues.status,
          'deadline': '',
          'createdAt': question.dataValues.createdAt,
          'learnerId': question.dataValues.id_learner,
          'helperId': question.dataValues.id_helper, //this may an array in later iterations
          //make helpers an array of helpers objects
          'helpers': [{
            helperName: question.dataValues.name,
            helperId: question.dataValues.id_helper,
          }]
        };
      });
      Promise.all(promises).then(function() {
        res.send(promises);
      });

    })
    .catch(function(err) {
      console.log('@_@ Error retrieving claimed questions', err);
      return res.sendStatus(500);
    });
  },
};

module.exports = controller;