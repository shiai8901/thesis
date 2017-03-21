const db = require('../database.js'); //for raw sql query
const Claim = require('./claimsModel.js');
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
    
    var currentUserId = req.query.userId;

    Claim.belongsTo(Question, {foreignKey: 'id_question'});
    Question.findAll({
      where: {
        userId: currentUserId, 
        status: 'claimed'}
    })
    .then(function(questions) {

      //i got the questions in form of an array
      //array length is 1
      console.log('QUESTIONS Array length', questions.length); // 1
      
      //loop through the questions
      var promises = questions.map(function(question) {

        console.log('EACH QUESTION is', question.dataValues);
        
        Claim.findOne({where: {
          id_question: question.dataValues.id,
        }
        })
        

        .then(function(claim) {
          console.log('The Claim row in claims table is', claim.dataValues); 

          User.findOne({where: {
            id: claim.dataValues.id_helper,
            // include: {model: Question}
          }
          })
          .then(function(user) {
            //found the 1st helper
            console.log('The helper is', user.dataValues);

            return {
              // 'id': claim.dataValues.id,
              // 'title': claim.question.title,
              // 'question': claim.question.question,
              // 'status': claim.question.status,
              // 'deadline': '',
              // 'createdAt': claim.dataValues.createdAt,
              // 'learnerId': claim.dataValues.id_learner,
              // 'helperId': claim.dataValues.id_helper,
              'helpers': {
                name: user.dataValues,
              }
            };


          });
        });




      });

      console.log('THe promises are', promises);


    })
    .catch(function(err) {
      console.log('Error retrieving claimed questions');
      return res.sendStatus(500);
    });
  },
};

// Promise.all(claims).then(function(claim) {
//   console.log('========== Success getting claimed questions', claim);
//   res.send(claims);
// }); 

module.exports = controller;

      //   var promises = claims.map(function(claim) {
      //     console.log('XXX each claim', claim);
      //     // console.log('XXX each claim claim.question.user', claim.question.user);
      //     return {
      //       'id': claim.dataValues.id,
      //       'title': claim.question.title,
      //       'question': claim.question.question,
      //       'status': claim.question.status,
      //       'deadline': '',
      //       'createdAt': claim.dataValues.createdAt,
      //       'learnerId': claim.dataValues.id_learner,
      //       'helperId': claim.dataValues.id_helper,
      //       'helpers': {
      //         name: claim.question.user.name,
      //       }
      //     };
      //   });

       
      // });
    
      

    // Claim.belongsTo(User, {foreignKey: 'id_helper'});
    // Claim.belongsTo(Question, {foreignKey: 'id_question'});
    // Claim.findAll({ where: {id_learner: currentUserId}, 
    //   include: [{model: Question, 
    //     include: [User]
    //   }]
    // })
    // .then(function(claims) {
    //   console.log('========== Success getting claimed questions');
    //   // console.log('XXX CLAIM RAW results', claims);
      
    //   var promises = claims.map(function(claim) {
    //     // console.log('XXX each claim', claim);
    //     // console.log('XXX each claim claim.question.user', claim.question.user);
    //     return {
    //       'id': claim.dataValues.id,
    //       'title': claim.question.title,
    //       'question': claim.question.question,
    //       'status': claim.question.status,
    //       'deadline': '',
    //       'createdAt': claim.dataValues.createdAt,
    //       'learnerId': claim.dataValues.id_learner,
    //       'helperId': claim.dataValues.id_helper,
    //       'helpers': {
    //         name: claim.question.user.name,
    //       }
    //     };
    //   });

    //   Promise.all(promises).then(function() {
    //     res.send(promises);
    //   });

    // })
    // .catch(function(err) {
    //   console.log('Error retrieving claimed questions');
    //   return res.sendStatus(500);
    // });