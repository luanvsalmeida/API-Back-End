const express = require('express');
const router = express.Router();
router.use(express.json());
const jwt = require('jsonwebtoken');
require('dotenv').config();
const orderController = require('../controllers/orderController');
const Auth = require('../helpers/Auth');

// Middlewares for authentication
router.use(Auth.validateToken);
router.use(Auth.authAdmin);

// Create a new order for any user (restricted for administrators)
router.post('/', orderController.createOrder);

// List all orders (restricted for administrators)
router.get('/', orderController.getOrders);

// Update the order from any user, open or closed (restricted for administrators)
router.post('/:id', orderController.updateOrder);

// Delete any order, open or closed (restricted for administrators)
router.delete('/:id', orderController.deleteOrder);

module.exports = router;