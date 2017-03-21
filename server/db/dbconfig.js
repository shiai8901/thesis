var app = require('./../app.js');
const Sequelize = require('sequelize');

var dbHost;
var db;
var user;
var pw;
var dbPort;

if ( app.get('env') === 'development' ) {
  console.log('it is development!!');
  db = 'hackeroo';
  user = '';
  pw = '';

} else {
  console.log('it is not development!!!');
  db = 'd7oj410eip9o96';
  user = 'wvdptjfsnehola';
  pw = 'cdbdbe12e3f23f31f718f75283f2db41eecbb9c2f3dcbb61ac60c247a1451f46';
  dbHost = 'ec2-54-243-55-1.compute-1.amazonaws.com';
  dbPort = 5432;
}

  const sequelize = new Sequelize(db, user, pw, {
    host: dbHost,
    port: dbPort,
    dialect: 'postgres',
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    }
  });



module.exports = sequelize;