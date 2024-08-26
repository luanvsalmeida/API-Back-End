var express = require('express');
var router = express.Router();
router.use(express.json());
const AdminDAO = require('../service/Admin');

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
router.get('/selectAdmin', async (req, res) => {
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
        console.log('Limit: ' + limit + ', Page: ' + page);
        let admins = await AdminDAO.getByPage(page, limit);
        res.status(200).json({message: "Data retrieved successfully", admins});
    } catch (error) {
        console.error(error);
        res.status(400).json({error: "Failed to retrieve data"});
    }
});

// Update Admin route
router.put('/updateAdmin', async (req,res) => {

});

// Delete Admin Route
router.delete('/deleteAdmin', async (req, res) => {

});

/**** Customer related operations ****/
// Read User


// Updatee User 


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


// Update Orders


// Delete Order


/**** Items related operations ****/
// Read Items


// Update Items


// Delete Items


module.exports = router;