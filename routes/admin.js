var express = require('express');
var router = express.Router();
router.use(express.json());
const AdminDAO = require('../service/Admin');
const CustomerDAO = require('../service/Customer');
const OrderDAO = require('../service/Order');
const ItemDAO = require('../service/Item');
const BookDAO = require('../service/Book');

/**** Administrator operations ****/
// Create Admin Route
router.post('/newAdmin', async (req, res) => {
    try { 
        let {name, mail, phone, hire_date, password} = req.body;
        const admin = await AdminDAO.insert(name, mail, phone, hire_date, password);
        res.status(201).json({message: 'Administrator created successfully', admin});
    } catch (error) {
        res.status(400).json({error: 'Failed to create administrator'});
    }
});

// Read Admin Route
router.get('/selectAllAdmin', async (req, res) => {
    try{
        const admins = await AdminDAO.getAll();
        res.status(200).json({message: "Data retrieved successfully", admins});
    } catch (error) {
        res.status(400).json({error: 'Failed to retrieve data'})        
    }
    
});

// Read Admin with the pages and collumns defined (Untested)
router.get('/getAdmins', async (req, res) => {
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
        let admins = await AdminDAO.getByPage(page, limit);
        res.status(200).json({message: "Data retrieved successfully", admins});
    } catch (error) {
        res.status(400).json({error: "Failed to retrieve data"});
    }
});

// Read a specific admin by his id
router.get('/getAdmin/:id', async (req, res) => {
    const admin = await AdminDAO.getById(req.params.id);
    if (!admin) {
        res.status(404).json({msg: "Administrator not found"});
    }
    else {
        res.status(200).json({admin: admin});
    }
});

// Update Admin route
router.put('/updateAdmin', async (req,res) => {
    let {id, name, mail, phone, hireDate, password} = req.body;
    let updatedAdmin = {
        admin_name: name,
        admin_mail: mail,
        admin_phone: phone,
        hire_date: hireDate,
        admin_password: password
    }
    try {
        const rowsUpdated = await AdminDAO.updateById(id, updatedAdmin);
        if (rowsUpdated[0] === 0) {     // Checks if any row changed
            res.status(404).json({msg: "Administrator not found"});
        }
        const admin = await AdminDAO.getById(id);
        res.status(200).json({msg: "Administrator updated successfully", admin: admin});
    } catch (error) {
        res.status(500).json({error: "Failed to update data"});
    }
});

// Delete Admin route
router.delete('/deleteAdmin/:id', async (req, res) => {
    let {id} = req.params;
    try {
        const rowsDeleted = await AdminDAO.deleteById(id);
        if (rowsDeleted[0] === 0) {      // Checks if any row was deteled
            res.status(404).json({msg: "Administrator not found"});
        }
        res.status(200).json({msg: "Administrator deleted with success"});
    } catch (error) {
        res.status(500).json({error: "Failed to delete data"});
    }
});

/**** Customer related operations ****/
// Create User
router.post('/createCustomer', async (req, res) => {
    try {
        let {name, mail, password, phone, address} = req.body;
        const customer = await CustomerDAO.insert(name, mail, password, phone, address);
        res.status(201).json({message: 'Customer created successfully', customer});
      } catch (error) {
        res.status(400).json({error: 'Failed to create customer'})
      }
});

// Read customer with pagination
router.get('/getCustomers', async (req, res) => {
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
});

// Read customer by id
router.get('/getCustomer/:id', async (req, res) => {
    let {id} = req.params;
    const user  = await CustomerDAO.getById(id);
    if(!user) {             // Check if the user exists
        res.status(404).json({msg: "User not found"});
    }
    else {
        res.status(200).json({customer: user});
    }

}); 

// Update User 
router.put('/updateCustomer/:id', async (req, res) => {
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
});

// Delete User
router.delete('/deleteCustomer/:id', async (req, res) => {
    let {id} = req.params;
    try {
        const rowsDeleted = await CustomerDAO.deleteById(id);
        if (rowsDeleted[0] === 0) {     // Checks if any row was deleted
            res.status(404).json({msg: "Customer not found"});
        }
        res.status(200).json({msg: "Customer deleted with success"});
    } catch (error) {
        res.status(500).json({error: "Failed to delete data"});
    }
});

/**** Books operations ****/
// Create Book
router.post('/newBook', async (req, res) => {

});

// Read Book more likely to be in non authenticated router
router.get('/selectBook', async (req, res) => {

});


// Update Book
router.put('/updateBook', async (req, res) => {

});

// Delete Book
router.delete('/deleteBook', async (req, res) => {

});

/**** Order related operations ****/
// Read Orders
router.get('/getOrders', async (req, res) => {
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
        let orders = await OrderDAO.getByPage(page, limit);
        res.status(200).json({message: "Data retrieved successfully", orders});
    } catch (error) {
        console.error(error);
        res.status(400).json({error: "Failed to retrieve data"});
    }
});

// Update Orders


// Delete Order


/**** Items related operations ****/
// Read Items
router.get('/getItems', async (req, res) => {
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
        let items = await ItemDAO.getByPage(page, limit);
        res.status(200).json({message: "Data retrieved successfully", items});
    } catch (error) {
        console.error(error);
        res.status(400).json({error: "Failed to retrieve data"});
    }
});

// Update Items


// Delete Items


module.exports = router;