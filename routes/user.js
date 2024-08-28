var express = require('express');
var router = express.Router();
router.use(express.json());
var jwt = require('jsonwebtoken');
const CustomerDAO = require('../service/Customer');
const OrderDAO = require('../service/Order');
const ItemDAO = require('../service/Item');
const Auth = require('../helpers/Auth');

// User sign in route
router.post('/signIn', async (req, res) => {
    const { mail, password } = req.body;
    try {
        let user = await CustomerDAO.getByLogin(mail, password);
        if (user.length > 0 && user[0].customer_mail === mail && user[0].customer_password === password) {  // Tests if the mail and password belongs to a customer
            // Generate a token with the user's ID and email
            const token = jwt.sign(
                { id: user[0].customer_id, mail: user[0].customer_mail },
                'your_secret_key',
                { expiresIn: '1h' }
            );
            res.cookie('token', token, {
            httpOnly: true,  // Accessible only by the web server
            secure: true,    // Ensures the browser only sends the cookie over HTTPS
            maxAge: 3600000  // 1 hour in milliseconds
        });
            res.status(200).json({ message: 'Signed in successfully', customer: user, token: token});
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (error) {           
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Create new Order
router.post('/checkout', Auth.authCustomer, async (req, res) => {
    const { customer_id, items } = req.body;
    // Tests wheter customer is shopping for his own id
    if (req.user.id != customer_id) {
        console.log(req.user.id);
        res.status(403).json({msg: "invalid token"});
    }
    else {
        try {
            let order = await OrderDAO.insert(2);
                let orders = {
                    order: order,
                    items: []
                }
                for (const item of items) {
                    const insertedItem = await ItemDAO.insert(item.quantity, order.order_id, item.book_id);
                    orders.items.push(insertedItem);
                }
                res.status(200).json({msg: "Order created successfully", order: orders});
        } catch (error) {
            console.log(error);
            res.status(500).json({msg: "Unable to store order"});
        }
    }
});

module.exports = router;