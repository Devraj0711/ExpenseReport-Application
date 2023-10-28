const Sequelize = require('sequelize');

const sequelize = new Sequelize('expense_management', 'root', 'Devraj@07', {
  dialect: 'mysql',
  host: 'localhost',
  logging: console.log, // Enable logging of executed SQL queries

});

module.exports = sequelize;
