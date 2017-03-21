// var chai = require('chai');
// var expect = chai.expect;
var usersController = require('./../server/db/users/usersController.js');

// describe('users controller', function() {
//   it('should have a send mail function', function() {
//     expect(usersController.sendMail).to.be.a('function');
//   });


// });

usersController.sendMail(1, 1, '123456');