const CustomerDAO = require('../service/Customer');
const AdminDAO = require('../service/Admin');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Sign Customer or Administrator in
const signIn = async (req, res) => {
    const { user_mail, password } = req.body;
    let type = '';
    let id;
    try {
        let user = await AdminDAO.getByLogin(user_mail, password);
        if (user.length > 0 && user[0].admin_mail === user_mail && user[0].admin_password === password) {   // Verify wheter mail and password belongs to a administrator
            type = 'administrator';     // If mail and password belongs to a admin, set type to administrator
            id = user[0].admin_id;
        }
        else {
            user = await CustomerDAO.getByLogin(user_mail, password);
            if (type === '' && user.length > 0 && user[0].customer_mail === user_mail && user[0].customer_password === password) {  // Tests if the mail and password belongs to a customer
                type = 'customer';
                id = user[0].customer_id;
            }
        }
        
        console.log(user);
        if (type !== '' ) {         // If any the user exists
            // Generate a token with the user's ID and mail
            const token = jwt.sign(
                { id, mail: user_mail, type },
                process.env.SECRET,
                { expiresIn: '1h'}
            );
            res.status(200).json({ message: 'Signed in successfully', user, token});
        } 
        else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Iternal server error' });
    }
};

// Sign Up Customer
const signUp = async (req, res) => {
    try {
        let {name, mail, password, phone, address} = req.body;
        const customer = await CustomerDAO.insert(name, mail, phone, address, password);
        let { customer_id, customer_mail } = customer;
        const token = jwt.sign({ customer_id, customer_mail, type: "customer"  }, process.env.SECRET, {    // Creating json web token
            expiresIn: 3600
        });
        //res.cookie('jwt', token, { httpOnly: true, maxAge: 3600000});
    
        res.status(201).json({message: 'Customer created successfully', customer, token: token});
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            res.status(409).json({ msg: "Email is already in use" });
        } else {
            console.log(error);
            res.status(500).json({ error: "Failed to register user" });
        }
    }
};

// Sign Out user (not implemented yet)
const signOut = (req, res) => {
}

module.exports = {
    signIn,
    signUp,
    signOut
};