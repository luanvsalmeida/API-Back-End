const express = require('express');
const router = express.Router();
router.use(express.json());
const authController = require('../controllers/authController');

// Sign Customer or Administrator in
router.post('/signIn', authController.signIn);

// Sign Up Customer
router.post('/signUp', authController.signUp);

// Sign out User (Customer or admin)
router.post('/signOut', authController.signOut);

module.exports = router;