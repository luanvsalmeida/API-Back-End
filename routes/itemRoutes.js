const express = require('express');
const router = express.Router();
router.use(express.json());
const jwt = require('jsonwebtoken');
require('dotenv').config();
const itemController = require('../controllers/itemController');

// Create a new item for any user (restricted for administrators)
router.post('/', itemController.createItem);

// List all items (restricted for administrators)
router.get('/', itemController.getItems);

// Update the item from any user, open or closed (restricted for administrators)
router.post('/:id', itemController.updateItem);

// Delete any item, open or closed (restricted for administrators)
router.delete('/:id', itemController.deleteItem);

module.exports = router;