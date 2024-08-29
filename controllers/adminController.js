const AdminDAO = require('../service/Admin');
const CustomerDAO = require('../service/Customer');
const Auth = require('../helpers/Auth');

// Create Admin
const newAdmin = async (req, res) => {
    // #swagger.summary = 'Cria um novo administrador'
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
    let id = req.user.id;   // get token id
    let {admin_name, admin_mail, admin_phone, hire_date, admin_password} = req.body;    // Admin data
    if (req.params.id == id) {      // If the Id belongs to the admin logged
        try {
            let rowsUpdated =  await AdminDAO.updateById(id, {  // Update Data
                admin_name,
                admin_mail, 
                admin_phone, 
                hire_date,
                admin_password
            });
            if (rowsUpdated[0] === 0) {                 // No rows changed
                res.status(404).json({msg: "Not Found"});
            }
            else {          
                const updatedAdmin = await AdminDAO.getById(id);
                res.status(200).json({msg: "Administrator updated successfully", updatedAdmin});
            }
        } catch (error) {
            res.status(500).json({error});
        }
    }
    else {                    
        res.status(403).json({msg: "Forbidden"});
    }
};

// Delete administrator's own data
const deleteAdmin = async (req, res) => {
    let id = req.user.id;   // get token id
    if (req.params.id == id) {
        try {
            let rowsDeleted = await AdminDAO.deleteById(id);
            if (rowsDeleted === 0) {
                res.status(404).json({msg: "Not Found"});
            }
            else {
                res.status(200).json({msg: "Administrator deleted successfully"});
            }
        } catch (error) {
            res.status(500).json({error});
        }
    }
    else {
        res.status(403).json({msg: "Forbidden"});
    }
};

// Get administrator's own data 
const getAdmin = async (req, res) => {
    let id = req.user.id;   // get token id
    if (req.params.id == id) {
        try {
            const admin = await AdminDAO.getById(req.params.id);
            if (!admin) {
                res.status(404).json({msg: "Administrator not found"});
            }
            else {
                res.status(200).json({admin: admin});
            }
        } catch (error) {
            res.status(500).json({error});
        }
    }
    else {
        res.status(403).json({msg: "Forbidden"});
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
        if (rowsDeleted === 0) {     // Check if any row was deleted
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
