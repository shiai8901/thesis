var chai = require('chai');
var spies = require('chai-spies');
chai.use(spies);
var expect = chai.expect;
var mailer = require('./../server/mailer.js');

describe('Node mailer', function(){
// //   var spy = chai.spy(mailer);

  it('should be a function', function() {
    expect(mailer).to.be.a('function');
  });

// //   it('should have a spy', function() {
// //     expect(spy).to.be.spy;
// //   });

//   it('should send a mail when called', function() {

// //     mailer(['alisonmichellereed@gmail.com', 'alisonmichellereed@gmail.com']);
// //     expect(spy).to.have.been.called();
//   });

});

  // mailer(['alisonmichellereed@gmail.com', 'alisonmichellereed@gmail.com'], 123456);

