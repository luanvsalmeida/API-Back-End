const express = require('express');
const router = express.Router();
router.use(express.json());
const jwt = require('jsonwebtoken');
require('dotenv').config();
const bookController = require('../controllers/bookController');
const Auth = require('../helpers/Auth');

// Create a new book
router.post('/', Auth.validateToken, Auth.authAdmin, bookController.createBook);

// List books with pagination
router.get('/',  bookController.getBooks);

// Update book by it's id
router.post('/:id', Auth.validateToken, Auth.authAdmin, bookController.updateBook);

// Delete book by it's id
router.delete('/:id', Auth.validateToken, Auth.authAdmin, bookController.deleteBook);

module.exports = router;