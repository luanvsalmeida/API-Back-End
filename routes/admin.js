var express = require('express');
var router = express.Router();
router.use(express.json());
const AdminDAO = require('../service/Admin');
const CustomerDAO = require('../service/Customer');
const OrderDAO = require('../service/Order');
const ItemDAO = require('../service/Item');
const Admin = require('../service/Admin');

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
        if (rowsUpdated[0] === 0) {
            res.status(404).json({msg: "User not found"});
        }
        const admin = await AdminDAO.getById(id);
        res.status(200).json({msg: "User updated successfully", admin: admin});
    } catch (error) {
        res.status(500).json({error: "Failed to update data"});
    }
});

// Delete Admin Route
router.delete('/deleteAdmin', async (req, res) => {

});

/**** Customer related operations ****/
// Read User
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

// Update User 


// Delete User


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