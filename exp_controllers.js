const Exp_page = require('../models/ExpenseDB');
const path = require('path');
const { Op } = require('sequelize');

const bcrypt= require('bcrypt');


exports.getIndex = (req, res, next) => {
  
  Exp_page.findAll()
    .then(rows => {
      res.sendFile(path.join(__dirname, '..', 'views', 'Expense', 'details.html'));
      console.log(rows);
    })
  // Exp_page.findAll()
  // .then(expenses => {
  //   const expensesJSON = JSON.stringify(expenses);
  //   res.render('Expense/details', { expensesJSON: expensesJSON }); // Corrected path
  // })
    .catch(err => {
      console.error('Error fetching expenses: ', err);
      res.status(500).json({ error: 'Internal server error' });
    });
}
//     Exp_page.findAll()
//     .then(rows => {
//       res.sendFile(path.join(__dirname, '..', 'views', 'Expense', 'details.html'));
//       console.log(rows);
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).send('Internal Server Error');
//     });
// };

exports.postIndex = (req, res, next) => {
  const Amount = req.body.Amount;
  const description = req.body.description;
  const Category = req.body.Category;
  console.log(" checking all the details", req.body);
  Exp_page.create({
    Amount: Amount,
    description: description,
    Category: Category
  })
  .then(result => {
    // Fetch all the data from the database after insertion
    Exp_page.findAll().then(expenses => {
      res.status(200).json({ expenses: expenses }); // Send the expenses data as JSON response
    });
  })
  .catch(err => {
    console.error('Error inserting data: ', err);
    res.status(500).json({ error: 'Internal server error' }); // Handle the error appropriately
  });
};

