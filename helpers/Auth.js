const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
    // Token validation
    validateToken: (req, res, next) => {     
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        jwt.verify(token, process.env.SECRET , (err, user) => {
            if (err) return res.status(403).json({msg: "Invalid token"});
            console.log(err);
            // `user` now contains the decoded payload, e.g., { id: 1, mail: 'example@mail.com' }
            console.log(user);
            req.user = user;
            next();
        });
    },

    // Tests wether token belongs to a customer or not
    authCustomer: (req, res, next) => {
        if (req.user.type === 'customer') {
            next();
        }
        else {
            res.status(403).json({msg: "Access denied"});
        }
    },

    // Tests wheter token belongs to a administrator or not
    authAdmin: (req, res, next) => {
        if (req.user.type === 'administrator') {
            next();
        }
        else {
            res.status(403).json({msg: "Access denied"});
        }
    }


};