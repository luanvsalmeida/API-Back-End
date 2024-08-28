const express = require('express');
const router = express.Router();
router.use(express.json());
const jwt = require('jsonwebtoken');
require('dotenv').config();
const adminController = require('../controllers/adminController');

// Routes
// Create Admin
router.post('/newAdmin', adminController.newAdmin);

// Update the logged administrator's data
router.put('/updateAdmin/:id', adminController.updateAdmin);

// Delete administrator's own data
router.delete('/deleteAdmin/:id', adminController.deleteAdmin);

// Get administrator's own data
router.get('/getAdmin/:id', adminController.getAdmin);

// Create a customer without sign in
router.post('/createCustomer', adminController.createCustomer);

// Delete any customer by id
router.delete('/deleteCustomer/:id', adminController.deleteCustomer);

// Update any customer by id
router.put('/updateCustomer/:id', adminController.updateCustomer);

// Get customers with pagination
router.get('/getCustomers', adminController.getCustomers);


module.exports = router;