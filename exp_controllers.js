const Home_page = require('../models/db_model'); // Adjust the path based on your project structure
const Exp_page = require('../models/ExpenseDB'); // Adjust the path based on your project structure


const path = require('path');
const { Op } = require('sequelize');
const fs = require('fs');
const bcrypt= require('bcrypt');

exports.getIndex=(req, res, next) => {
  Exp_page.findAll()
    .then(expense => {
      const expenseData = JSON.stringify(expense);
      console.log(expenseData);
      res.render('expense/details', {
        expense: expenseData,
        pageTitle: 'All Products',
        path: '/expense/details'
      });
    })
    .catch(err => {
      console.log(err);
    });
}

exports.postIndex = (req, res, next) => {
  const { Amount, description, Category } = req.body;
  
  Exp_page.create({
    Amount: Amount,
    description: description,
    Category: Category,
    ExpenseReportId: req.user.id
  })
  .then(expenses => {
    console.log(expenses);
    return res.status(201).json({ expense: expenses, success: true });
  })
  .catch(err => {
    console.error('Error inserting data: ', err);
    return res.status(500).json({ error: 'Internal Server Error', success: false });
  });
};
