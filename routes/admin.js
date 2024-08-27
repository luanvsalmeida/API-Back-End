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

// Read Admin with the pages and collumns defined 
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
        if (rowsDeleted === 0) {      // Checks if any row was deteled
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
        if (rowsDeleted === 0) {     // Checks if any row was deleted
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
    let {title, author, price, stock, publication_date, genre} = req.body;
    try {
        const book = await BookDAO.insert(title, author, price, stock, publication_date, genre);
        res.status(201).json({message: "Book created successfully", book: book});
    } catch (error) {
        res.status(400).json({error: "Failed to insert book"});
    }
});

// Read Book with pagination more likely to be in non authenticated router
router.get('/selectBook', async (req, res) => {
    let {page,limit} = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    if (!page || isNaN(page) || page <= 0) {
        return res.status(400).json({msg: "Invalid parameter for page"});
    }

    if (limit !== 5 && limit !== 10 && limit !== 30) {
        return res.status(400).json({msg: "Invalid parameter for limit"});
    }

    try {
        let books = await BookDAO.getByPage(page, limit);
        res.status(200).json({message: "Data retrieved successfully", books});
    } catch (error) {
        res.status(400).json({error: "Failed to retrieve data"});
    }
});


// Update Book
router.put('/updateBook/:id', async (req, res) => {
    let {id} = req.params;
    let {title, author, price, stock, publication_date, genre} = req.body;
    let updatedBook = {
        book_title: title,
        author: author,
        price: price,
        stock: stock,
        publication_date, publication_date,
        genre: genre
    }
    try {
        const rowsUpdated = await BookDAO.updateById(updatedBook, id);
        if (rowsUpdated[0] === 0) {
            res.status(404).json({msg: "Book not found"});
        }
        const book = await BookDAO.getById(id);
        res.status(200).json({msg: "Book updated successfully", Book: book});
    } catch (error) {
        res.status(500).json({error: "Failed to update data"});    
    }
});

// Delete Book
router.delete('/deleteBook/:id', async (req, res) => {
    let {id} = req.params;
    try{ 
        const rowsDeleted = await BookDAO.deleteById(id);
        if (rowsDeleted === 0) {     // Checks if any row was deleted
            res.status(404).json({msg: "Book not found"});
        }
        res.status(200).json({msg: "Book deleted successfully"});
    } catch (error) {
        res.status(500).json({error: "Failed to delete data"});
    }
});

/**** Order related operations ****/
// Create order (for any user)
router.post('/newOrder', async (req, res) => {
    let {customer_id} = req.body;
    try {
        const order = await OrderDAO.insert(customer_id);
        res.status(201).json({message: "Order created successfully", order});
    } catch (error) {
        res.status(400).json({error: "Failed to create order"});
    }
});

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
router.put('/updateOrder/:id', async (req, res) => {
    let {id} = req.params;
    let {customer_id, date} = req.body;
    let updatedOrder = {
        customer_id: customer_id,
        order_date: date
    }
    try {
        const rowsUpdated = await OrderDAO.updateById(updatedOrder, id);
        if (rowsUpdated[0] === 0) {
            res.status(404).json({msg: "Order not found"});
        }
        const order = await OrderDAO.getById(id);
        res.status(200).json({msg: "Order updated successfully", Order: order});
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Failed to update data"});    
    }
});

// Delete Order
router.delete('/deleteOrder/:id', async (req, res) => {
    let {id} = req.params;
    try{ 
        const rowsDeleted = await OrderDAO.deleteById(id);
        if (rowsDeleted === 0) {     // Checks if any row was deleted
            res.status(404).json({msg: "Order not found"});
        }
        res.status(200).json({msg: "Order deleted successfully"});
    } catch (error) {
        res.status(500).json({error: "Failed to delete data"});
    }
});

/**** Items related operations ****/
// Create Item (for any order)
router.post('/newItem', async (req, res) => {
    let {quantity, order_id, book_id} = req.body;
    try {
        const item = await ItemDAO.insert(quantity, order_id, book_id);
        res.status(201).json({message: "Item created successfully", item});
    } catch (error) {
        res.status(400).json({error: "Failed to create item"});
    }
});


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
router.put('/updateItem/:id', async (req, res) => {
    let { id } = req.params;
    let { quantity, order_id, book_id } = req.body;
    let updatedItem = {
        quantity: quantity,
        order_id: order_id,
        book_id: book_id
    };
    try {
        const rowsUpdated = await ItemDAO.updateById(id, updatedItem);
        if (rowsUpdated[0] === 0) { // Check if any row was changed
            return res.status(404).json({ msg: "Item not found" });
        }
        const item = await ItemDAO.getById(id);
        return res.status(200).json({ msg: "Item updated successfully", Item: item });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Failed to update data" });
    }
});


// Delete Items
router.delete('/deleteItem/:id', async (req, res) => {
    let {id} = req.params;
    try{ 
        const rowsDeleted = await ItemDAO.deleteById(id);
        if (rowsDeleted === 0) {     // Checks if any row was deleted
            res.status(404).json({msg: "Item not found"});
        }
        res.status(200).json({msg: "Item deleted successfully"});
    } catch (error) {
        res.status(500).json({error: "Failed to delete data"});
    }
});


module.exports = router;