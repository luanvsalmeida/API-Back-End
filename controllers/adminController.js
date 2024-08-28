const AdminDAO = require('../service/Admin');
const CustomerDAO = require('../service/Customer');
const Auth = require('../helpers/Auth');

// Create Admin
const newAdmin = async (req, res) => {
    try { 
        let {name, mail, phone, hire_date, password} = req.body;
        const admin = await AdminDAO.insert(name, mail, phone, hire_date, password);
        
        res.status(201).json({message: 'Administrator created successfully', admin});
    } catch (error) {
        res.status(400).json({error: 'Failed to create administrator'});
    }
};

// Update the logged administrator's data
const updateAdmin = async (req, res) => {

};

// Delete administrator's own data
const deleteAdmin = async (req, res) => {

};

// Get administrator's own data (unfinished)
const getAdmin = async (req, res) => {
    const admin = await AdminDAO.getById(req.params.id);
    if (!admin) {
        res.status(404).json({msg: "Administrator not found"});
    }
    else {
        res.status(200).json({admin: admin});
    }
};

// Create a customer without sign in
const createCustomer = async (req, res) => {
    try {
        let {name, mail, password, phone, address} = req.body;
        const customer = await CustomerDAO.insert(name, mail, password, phone, address);
        res.status(201).json({message: 'Customer created successfully', customer});
    } catch (error) {
        res.status(400).json({error: 'Failed to create customer'})
    }
};

// Delete any customer by id
const deleteCustomer = async (req, res) => {
    let {id} = req.params;
    try {
        const rowsDeleted = await CustomerDAO.deleteById(id);
        if (rowsDeleted === 0) {     // Checks if any row was deleted
            res.status(404).json({msg: "Customer not found"});
        }
        res.status(200).json({msg: "Customer deleted with success"});
    } catch (error) {
        res.status(500).json({error: "Failed to delete data"});
    }
};

// Update any customer by id
const updateCustomer = async (req, res) => {
    let {id} = req.params;
    let {name, mail, phone, address, password} = req.body;
    let updatedCustomer = {
        customer_name: name,
        customer_mail: mail,
        customer_phone: phone,
        customer_address: address,
        customer_password: password
    }
    try {
        const rowsUpdated = await CustomerDAO.updateById(id, updatedCustomer);
        if(rowsUpdated[0] === 0) {     // Checks if any row changed
            res.status(404).json({msg: "Administrator not found"});
        }
        const customer = await CustomerDAO.getById(id);
        res.status(200).json({msg: "Customer updated successfully", customer: customer });
    } catch (error) {
        res.status(500).json({error: "Failed to update data"});
    }
};

// Get customers with pagination
const getCustomers = async (req, res) => {
    let {page, limit} = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    if (!page || isNaN(page) || page <= 0) {
        return res.status(400).json({msg: "Invalid parameter for page"});
    }

    if (limit !== 5 && limit !== 10 && limit !== 30) {
        return res.status(400).json({msg: "Invalid parameter for limit"});
    }

    try {
        let customers = await CustomerDAO.getByPage(page, limit);
        res.status(200).json({message: "Data retrieved successfully", customers});
    } catch (error) {
        console.error(error);
        res.status(400).json({error: "Failed to retrieve data"});
    }
};

module.exports = {
    newAdmin,
    updateAdmin,
    deleteAdmin,
    getAdmin,
    createCustomer,
    deleteCustomer,
    updateCustomer,
    getCustomers
};
