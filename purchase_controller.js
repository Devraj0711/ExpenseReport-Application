const Home_page = require('../models/db_model');
const path = require('path');
const { Op } = require('sequelize');

const bcrypt= require('bcrypt');

const jwt= require('jsonwebtoken');

const Order =require('../models/order');

const RazorPay =require('razorpay');

require('dotenv').config();

exports.purchasepremimum= async(req, res)=> {
    try{
        var rzp= new RazorPay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        })

        console.log(" rzp ---   ", rzp.key_id);
        
        const amount= 2500;
        const order = await rzp.orders.create({ amount, currency: "INR" });
        await req.user.createOrder({ orderid: order.id, status: "PENDING" });

        // rzp.orders.create({ amount, currency:"INR"}, (err, order)=>{
        //     if(err)
        //     {
        //         throw new Error(JSON.stringify(err));
        //     }
        //     req.user.createOrder({ orderid: order.id, status: "PENDING"}). then( () =>{
        //         return res.status(201).json({order, key_id: rzp.key_id});
        //     }).catch(err => {
        //         throw new Error(err)
        //     })
        // })
    
        return res.status(201).json({ order, key_id: rzp.key_id });
    } catch (err) {
        console.error(err);
        res.status(403).json({ message: 'Something went wrong', error: err });
    }
}