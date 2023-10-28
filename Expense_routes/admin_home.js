const path = require('path');

const express = require('express');

const adminController = require('../Expense_controllers/admin_controllers');

const router = express.Router();

// /admin/home => GET

router.get('/', adminController.getIndex);
router.post('/Home/signup.html', adminController.postAddDetails);

module.exports = router;
