const CustomerDAO = require('../service/Customer');
const AdminDAO = require('../service/Admin');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Sign Customer or Administrator in
const signIn = async (req, res) => {
    // #swagger.summary = 'Rota de login para cliente ou administrador'
    const { mail, password } = req.body;
    let type = '';          // Customer or admin
    let id;
    try {
        let user = await AdminDAO.getByLogin(mail, password);
        if (user.length > 0 && user[0].admin_mail === mail && user[0].admin_password === password) {   // Verify whether mail and password belongs to a administrator
            type = 'administrator';     // If mail and password belongs to a admin, set type to administrator
            id = user[0].admin_id;
        }
        else {
            user = await CustomerDAO.getByLogin(mail, password);
            if (type === '' && user.length > 0 && user[0].customer_mail === mail && user[0].customer_password === password) {  // Tests if the mail and password belongs to a customer
                type = 'customer';
                id = user[0].customer_id;
            }
        }
        
        console.log(user);
        if (type !== '' ) {         // If any the user exists
            // Generate a token with the user's ID and mail
            const token = jwt.sign(
                { id, mail: mail, type },
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
    // #swagger.summary = 'Cria um novo cliente e retorna o token para acesso a rotas autenticadas'
    try {
        let {name, mail, password, phone, address} = req.body;
        const customer = await CustomerDAO.insert(name, mail, phone, address, password);
        let { customer_id, customer_mail } = customer;
        const token = jwt.sign({ customer_id, customer_mail, type: "customer"  }, process.env.SECRET, {    // Creating json web token
            expiresIn: 3600
        });
    
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


module.exports = {
    signIn,
    signUp,
};