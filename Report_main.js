const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./Expense_controllers/error');

const sequelize =require('./util/database');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')))

const adminRoutes = require('./Expense_routes/admin_home');


app.use(adminRoutes);

app.use(errorController.get404);  

//use of sequelize to carry on all the DB commands
sequelize
.sync()
.then(result =>{
    //console.log(result);
    app.listen(1000);
})
.catch(err => {
    console.log(err);
});

