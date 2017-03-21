const db = require('../database.js'); //for raw sql query
const Collaborate = require('./collaborateModel.js');
const UserController = require('./../users/usersController.js');
const Question = require('../questions/questionsUserSpecificModel.js');
const User = require('./../users/usersModel.js');

const controller = {
  save: function(req, res, next) {
    //create room name from question id and current time in millisecond
    var d = new Date();
    var roomNumber = req.body.id_question + d.getTime().toString();
    console.log('id_helper ----------> ', req.body.id_helper);
    
    Collaborate.create({
      id_learner: req.body.id_learner,
      id_helper: req.body.id_helper,
      id_question: req.body.id_question,
      room_number: roomNumber
    })
    .then(function(task) {
      task.save();
      // console.log('========== Success saving collaborate session, room_number:', roomNumber);
      UserController.sendMail(req.body.id_learner, req.body.id_helper, roomNumber);
      return res.status(200);
    })
    .catch(function(err) {
      console.log('Error saving collaborate session', err.message);
      return res.sendStatus(500);
    });
  },

  retrieve: function(req, res, next) {
    // console.log('req.query.room_number --------->', req.query.room_number);
    var room_number = req.query.room_number;
    // console.log('room_number in controller: ', room_number);
    Collaborate.findOne({
      where: { room_number: room_number },
      include: [ {all: true} ]
    })
    .then(function(collaborate) {
      // console.log('eager loading in retrieving collaborate', collaborate.get());
      res.json(collaborate.get());
    })
    .catch(function(err) {
      console.log('err in retrieving collaborate: ', err.message);
      res.sendStatus(404);
    });
  },

  retrieveById: function(req, res, next) {
    // console.log('req.query.room_number --------->', req.query.collaborateId);
    Collaborate.findOne({
      where: {id: req.query.collaborateId},
      include: [{all: true}]
    })
    .then(function(collaborate) {
      res.json(collaborate);
    })
    .catch(function(err) {
      console.log('err in retrieving collaborate by id: ', err.message);
      res.sendStatus(404);
    });
  }
};

module.exports = controller;


