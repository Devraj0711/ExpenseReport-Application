const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Home_page = sequelize.define('ExpenseReport', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  Username: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true, // Ensures that the username is not an empty string
      len: [1, 255] // Limits the username length between 1 and 255 characters
    }
  },
  Email: {
    type: Sequelize.STRING,
    allowNull: false
    // You can add validation for the email as well if needed
  },
  Password: {
    type: Sequelize.STRING,
    allowNull: false
    // You can add validation for the password as well if needed
  }
});

module.exports = Home_page;
