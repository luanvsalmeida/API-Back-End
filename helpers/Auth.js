const jwt = require('jsonwebtoken')
module.exports = {
    authCustomer: (req, res, next) => {     
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        jwt.verify(token, 'your_secret_key', (err, user) => {
            if (err) return res.status(403).json({msg: "Invalid token"});
            
            // `user` now contains the decoded payload, e.g., { id: 1, mail: 'example@mail.com' }
            console.log(user);
            req.user = user;
            next();
        });
    }
};