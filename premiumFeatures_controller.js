const Home_page = require('../models/db_model');
const Expense = require('../models/ExpenseDB');
const path = require('path');
const { Op } = require('sequelize');

const bcrypt= require('bcrypt');

const jwt= require('jsonwebtoken');

const userController=  require('../Expense_controllers/admin_controllers');

const Order =require('../models/order');


exports.showLeaderboard = async (req, res) => {
    try {
        const users = await Home_page.findAll();
        const expenses = await Expense.findAll();

        // Create a dictionary to store aggregated expenses for each user
        const userAggregatedExpenses = {};
        
        expenses.forEach((expense) => {
            if (userAggregatedExpenses[expense.ExpenseReportId]) {
                userAggregatedExpenses[expense.ExpenseReportId] += expense.Amount;
            } else {
                userAggregatedExpenses[expense.ExpenseReportId] = expense.Amount;
            }
        });

        // Create an array to store user leaderboard details
        const userLeaderboardDetails = users.map((user) => {
            const totalCost = userAggregatedExpenses[user.id] || 0;
            return { Username: user.Username, total_cost: totalCost };
        });

        console.log('total amounts --> ', userLeaderboardDetails);
        userLeaderboardDetails.sort((a,b)=>b.total_cost - a.total_cost);
        res.status(200).json(userLeaderboardDetails);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
};


// exports.showLeaderboard= async(req,res)=>{
//     try{
//         const users= await Home_page.findAll()
//         const expenses= await Expense.findAll();
//         const useraAggregatedExpenses = {};
//         expenses.forEach((expense)=>{
//             if(useraAggregatedExpenses[expense.ExpenseReportId])
//             {
//                 useraAggregatedExpenses[expense.ExpenseReportId]= useraAggregatedExpenses[expense.ExpenseReportId]+ expense.Amount;
//             }
//             else
//             {
//                 useraAggregatedExpenses[expense.ExpenseReportId]= expense.Amount;
//             }
//         }) 
//         var userLeaderboardDetails= [];
//         users.forEach((user)=>{
//             userLeaderboardDetails.push({Username:user.Username, total_cost: useraAggregatedExpenses[user.id]})
//         })
//         console.log("total amounts --> ", userLeaderboardDetails);
//         res.status(200).json(userLeaderboardDetails);

//     }
//     catch(err)
//     {
//         console.log(err)
//         res.status(500).json(err)
//     }
// }


