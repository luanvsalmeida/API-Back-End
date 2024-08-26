var express = require('express');
var router = express.Router();
router.use(express.json());
var jwt = require('jsonwebtoken');
const CustomerDAO = require('../service/Customer');
const OrderDAO = require('../service/Order');
const ItemDAO = require('../service/Item');

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
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Create new Order
router.post('/checkout', async (req, res) => {
    const { customer_id, items } = req.body;
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
});

module.exports = router;