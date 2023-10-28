const Home_page = require('../models/db_model');
const path = require('path');
const { Op } = require('sequelize');

//sigup page
exports.getSignup = (req, res, next) => {
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

    const Username = req.body.Username;
    const Email = req.body.Email;
    const Password = req.body.Password;

    // Check if the email already exists in the database
    Home_page.findOne({
        where: {
            [Op.or]: [
                { Email: Email },
                { Username: Username }
            ]
        }
        })
        .then(existingUser => {
            if (existingUser) {
                // Email already exists, return 403 Forbidden status
                return res.status(403).alert(json({ error: 'Details already exists' }));
            } else {
                // Email doesn't exist, create a new record
                Home_page.create({
                    Username: Username,
                    Email: Email,
                    Password: Password
                })
                .then(result => {
                    console.log(result);
                    res.redirect('/Home/signin'); // Redirect to a success page or wherever appropriate
                })
                .catch(err => {
                    console.log(err);
                    // Handle the error appropriately, e.g., send an error response or render an error page
                });
            }
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

//signin page

exports.getSignin = (req, res, next) => {
    Home_page.findAll()
    .then(rows => {
      res.sendFile(path.join(__dirname, '..', 'views', 'Home', 'signin.html'));
      console.log(rows);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send('Internal Server Error');
    });
};

exports.PostSignin = (req, res, next) => {
    const Username = req.body.Username;
    const Password = req.body.Password;
    console.log(Username);
    // Check if the username exists in the database
    Home_page.findOne({
        where: {
            Username: Username
        }
    })
    .then(user => {
        if (!user) {
            // Username doesn't exist, return 401 Unauthorized status
            return res.status(401).json({ success: false, error: 'Invalid username or password' });
        }

        // If the username exists, check the password
        if (user.Password !== Password) {
            // Incorrect password, return 401 Unauthorized status
            return res.status(401).json({ success: false, error: 'Invalid username or password' });
        }

        // Username and password are correct, you can handle the success response here
        res.status(200).json({ success: true, message: 'Login successful' });
    })
    .catch(err => {
        console.log(err);
        // Handle the error appropriately, e.g., send an error response or render an error page
        res.status(500).json({success: false, error: 'Internal Server Error' });
    });
};
