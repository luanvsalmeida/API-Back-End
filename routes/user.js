var express = require('express');
var router = express.Router();
router.use(express.json());
var jwt = require('jsonwebtoken');
const CustomerDAO = require('../service/Customer');

// User sign in route
router.post('/signIn', async (req, res) => {
    const { mail, password } = req.body;
    try {
        let user = await CustomerDAO.getByLogin(mail, password);
        if (user.length > 0) {  // Tests if the mail and password belongs to a customer
            res.status(200).json({ message: 'Signed in successfully', customer: user});
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (error) {           // In case of some internal error
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;