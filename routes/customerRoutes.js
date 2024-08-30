const express = require('express');
const router = express.Router();
router.use(express.json());
const jwt = require('jsonwebtoken');
require('dotenv').config();
const customerController = require('../controllers/customerController');
const Auth = require('../helpers/Auth');

// Middlewares for authentication
router.use(Auth.validateToken);
router.use(Auth.authCustomer);

// Lists customer data
router.get('/customerInfo/:id', customerController.customerInfo);

// Update customer data
router.put('/update/:id', customerController.update);

// Delete customer own  data
router.delete('/deleteCustomer/:id', customerController.deleteCustomer);

// Create the order and item for the user that requested it
router.post('/checkout', Auth.authCustomer, customerController.checkout);

// Create a order without any item
router.post('/newOrder', customerController.newOrder);

// Get all orders that the user has done
router.get('/getOrder', customerController.getOrder);

// Delete some order that the user has created, only if it is open
router.delete('/deleteOrder/:id', customerController.deleteOrder);

// Define a order as closed
router.put('/closeOrder/:id', customerController.closeOrder);

// Create a item for a specific  order
router.post('/addToCart', customerController.addToCart);

// Delete an item of some open order that the user has created
router.delete('/removeFromCart/:id', customerController.removeFromCart);

// Update the item data of an open order that the user has created
router.put('/updateItem/:id', customerController.updateItem);

// Return the items of some close order and the total
router.get('/getReciept/:id', customerController.getReciept);

// Lista o total de compras que o cliente fez
router.get('/getAmountOfOrders/:id', customerController.getAmountOfOrders);

module.exports = router;