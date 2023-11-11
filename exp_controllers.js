const Home_page = require('../models/db_model'); // Adjust the path based on your project structure
const Exp_page = require('../models/ExpenseDB'); // Adjust the path based on your project structure

const token_ans= require('../Expense_controllers/admin_controllers'); // for export ans

const jwt=require('jsonwebtoken');

const path = require('path');
const { Op } = require('sequelize');
const fs = require('fs');
const bcrypt= require('bcrypt');


// const token = jwt.sign({ ExpenseReportIdId: Exp_page.ExpenseReportId }, 'dvysis23', { expiresIn: '1h' }); // Sign the token
const ansValue = token_ans.getAns();

exports.getIndex=(req, res, next) => {
  
  console.log("token value ---",ansValue)
 
  Exp_page.findAll()
  
    .then(expense => {
      const expenseData = JSON.stringify(expense);
      console.log(expenseData);
      res.render('expense/details', {
        expense: expenseData,
        pageTitle: 'All Products',
        path: '/expense/details',
        ansValue:ansValue
      });
    })
    .catch(err => {
      console.log(err);
    });
}


exports.postIndex = (req, res, next) => {
  const { Amount, description, Category } = req.body;
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized', success: false });
  }

  // Verify the token
  jwt.verify(token.replace('Bearer ', ''), 'dvysis23', (err, decodedToken) => {
    if (err) {
      console.error('Error decoding token: ', err);
      return res.status(401).json({ error: 'Unauthorized', success: false });
    }

    
  // console.log("sddv   ", req.headers.authorization)
  // // Verify the token
  // jwt.verify(req.body.token, 'dvysis23', (err, decodedToken) => {
  //   if (err) {
  //     console.error('Error decoding token: ', err);
  //     return res.status(401).json({ error: 'Unauthorized', success: false });
  //   }
  const ExpenseReportIdId  = decodedToken.ExpenseReportId;

  console.log("decoded ----", ExpenseReportIdId);

  Exp_page.create({
    Amount: Amount,
    description: description,
    Category: Category,
    ExpenseReportId: ExpenseReportIdId
  })
  .then(expenses => {

    //adding  total expense of a user in the totalExpenses column
    Home_page.findOne({where: {id: expenses.ExpenseReportId}}).then(user=> {
    
    const totalExpense =Number(user.totalExpenses)+ Number(expenses.Amount);
    Home_page.update({
      totalExpenses: totalExpense
    }, {
      where: {id: expenses.ExpenseReportId}
    })
    console.log("Let see the total Expenses  ", totalExpense);
    }).catch((err)=>{
      throw new Error(err);
  })

  
    console.log(expenses);
    return res.status(201).json({ expense: expenses, success: true });
  })
  .catch(err => {
    console.error('Error inserting data: ', err);
    return res.status(500).json({ error: 'Internal Server Error', success: false });
  })
});
};
