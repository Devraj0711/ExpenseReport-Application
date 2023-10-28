const Home_page = require('../models/db_model');
const path = require('path');
exports.getIndex = (req, res, next) => {
    Home_page.findAll()
    .then(rows => {
      res.sendFile(path.join(__dirname, '..', 'views', 'Home', 'signup.html'));
      console.log(rows);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send('Internal Server Error');
    });
};

exports.postAddDetails = (req, res, next) => {
    console.log("post command");
    
    const Username = req.body.Username.trim();
    const Email = req.body.Email;
    const Password = req.body.Password;
    // req.user
    // .createProduct({
    //     Username: Username,
    //     Email: Email,
    //     Password: Password
    // })
    //further simplifing code to include association  
    Home_page.create({
      Username: Username,
        Email: Email,
        Password: Password,
      // manually setting to associate User and Product table  //userId: req.user.id 
    })
    .then(result => {
      console.log(result);
      res.redirect('/signin'); // Redirect to a success page or wherever appropriate
    })
    .catch(err => {
      console.log(err);
      // Handle the error appropriately, e.g., send an error response or render an error page
    });
  };


// exports.getIndex = (req, res, next) => {
//   Home_page.findAll()
//   .then(rows=>{
//     res.render('Home/signup', {
//       prods: rows,
//       pageTitle: 'Login Page',
//       path: 'Home/signup'
//     });
//   })
//   .catch(err =>{
//     console.log(err);
//   });
// };