const CustomerDAO = require('../service/Customer');

// Sign Customer or Administrator in
const signIn = async (req, res) => {

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
            res.status(500).json({ error: "Failed to register user" });
        }
    }
};

module.exports = {
    signIn,
    signUp
};