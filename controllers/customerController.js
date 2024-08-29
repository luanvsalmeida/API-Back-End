const CustomerDAO = require('../service/Customer');
const BookDAO = require('../service/Book');
const OrderDAO = require('../service/Order');
const ItemDAO = require('../service/Item');
const Order = require('../service/Order');

// Lists customer data
const customerInfo = async (req, res) => {
    let id = req.user.id    // get token id
    if (req.params.id == id) {      // Test whether params belongs to the user logged or not
        try {
            let customer = await CustomerDAO.getById(id);
            if (customer) {         // If Customer was found
                res.status(200).json({msg: "Customer find successfully", customer});
            }
            else {
                res.status(404).json({msg: "Customer not found"});
            }
        } catch (error) {
            res.status(500).json({error});
        }
    }
    else {          // Id does not belongs to user logged 
        res.status(403).json({msg: "Forbiddend"});
    }
};

// Update customer data
const update = async (req, res) => {
    let id = req.user.id    // get token id
    let {customer_name, customer_mail, customer_phone, customer_password, customer_address} = req.body;     // Customer updated data
    if (req.params.id == id) {      // Test whether params belongs to the user logged or not
        try {
            let rowsUpdated = await CustomerDAO.updateById(id, { // Update Data
                customer_name, 
                customer_mail, 
                customer_phone, 
                customer_password,
                customer_address
            });
            if (rowsUpdated[0] === 0) { // No rows changed
                res.status(404).json({msg: "Not Found"});
            }
            else {
                const updatedCustomer = await CustomerDAO.getById(id);
                res.status(200).json({msg: "Customer updated successfully", updatedCustomer});
            }
        } catch (error) {
            res.status(500).json({error});
        }
    }
    else {          // Id does not belongs to user logged 
        res.status(403).json({msg: "Forbidden"});
    }
};

// Delete customer own data
const deleteCustomer = async (req, res) => {
    let id = req.user.id;   // get token id
    if (req.params.id == id) {
        try {
            let rowsDeleted = await CustomerDAO.deleteById(id);     // Delete
            if (rowsDeleted === 0) {                                // Verify if something was deleted
                res.status(404).json({msg: "Not Found"});
            }
            else {
                res.status(200).json({msg: "Customer deleted successfully"});
            }
        } catch (error) {
            res.status(500).json({error});
        }
    }
    else {
        res.status(403).json({msg: "Forbidden"});
    }
};

// Create the order and item for the user that requested it
const checkout = async (req, res) => {
    const { customer_id, items } = req.body;
    // Tests wheter customer is shopping for his own id
    if (req.user.id != customer_id) {
        console.log(req.user.id);
        res.status(403).json({msg: "invalid token"});
    }
    else {
        try {
            let order = await OrderDAO.insert(2);
            let orders = {
                order: order,
                items: []
            }
            for (const item of items) {
                const insertedItem = await ItemDAO.insert(item.quantity, order.order_id, item.book_id);
                orders.items.push(insertedItem);
            }
            res.status(200).json({msg: "Order created successfully", order: orders});
        } catch (error) {
            console.log(error);
            res.status(500).json({msg: "Unable to store order"});
        }
    }
};

// Create a order without any item
const newOrder = async (req, res) => {
    let id = req.user.id;

    try {
        const order = await OrderDAO.insert(id, true);
        res.status(201).json({message: 'Order created successfully', order});
    } catch (error) {
        res.status(400).json({error: "Failed to create order"});
    }
};

// Get all orders that the user has done
const getOrder = async (req, res) => {
    let id = req.user.id;
    let { page, limit } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    // Validate page and limit
    if (!page || isNaN(page) || page <= 0) {
        return res.status(400).json({msg: "Invalid parameter for page"});
    }

    if (limit !== 5 && limit !== 10 && limit !== 30) {
        return res.status(400).json({msg: "Invalid parameter for limit"});
    }
    // Get orders
    try {
        const orders = await OrderDAO.getByCustomer(id, page, limit);
        res.status(200).json(orders);
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
};

// Delete some order that the user has created, only if it is open
const deleteOrder = async (req, res) => {
    let order_id = req.params.id;
    let {id} = req.user;
    try {
        let order = await OrderDAO.getById(order_id);           // get the order
        if (order.customer_id == id) {                          // Verify if it belongs to the customer
            deleteRows = await OrderDAO.deleteById(order_id);   // If so, the order will be deleted
            res.json({msg: "Order deleted successfully"});
        }
        else {
            res.json(403).json({msg: "Forbidden"});
        }
    } catch (error) {
        res.status(500).json(error);
    }
    
};

// Define a order as closed 
const closeOrder = async (req, res) => {
    let order_id = req.params.id;
    let { id } = req.user;

    try {
        let order = await OrderDAO.getById(order_id);       // Get the order
        if (order && id == order.customer_id) {             // Test whether order belongs to customer
            order.is_open = false;                          // Set the order as closed
            console.log(order);
            await order.save();

            order = await OrderDAO.getById(order_id);       
            res.status(200).json({ msg: "Order closed", order });
        } else {
            res.status(404).json({ msg: "Order not found or unauthorized" });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
};


// Create a item for a specific  order
const addToCart = async (req, res) => {
    let {order_id, book_id, quantity} = req.body;
    let {id} = req.user;
    try {
        let order = await OrderDAO.getById(order_id);                           // Get the order
        if (order.customer_id == id) {                                          // If order belongs to customer
            let item = await ItemDAO.insert(quantity, order_id, book_id);       // Create Item
            res.status(201).json({msg: "Item add to cart successfully", item});
        }
        else {
            res.status(403).json({msg: "Forbidden"});
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

// Delete an item of some open order that the user has created 
const removeFromCart = async (req, res) => {
    let item_id = req.params.id;
    let {id} = req.user;

    try {
        // retrieve the item
        let item = await ItemDAO.getByIdAndCustomer(item_id, id);
        if (item) {  
            let order = await OrderDAO.getById(item.order_id);
            if (order.is_open) {    // Check if its open
                let deletedRows = await ItemDAO.deleteById(item.item_id);
                if (deletedRows > 0) {
                    res.status(200).json({msg: "Item deleted successfully"});
                }
                else {
                    res.status(404).json({msg: "Item not found"});
                }
            }   
            else {
                res.status(400).json({msg: "Order is already finished"});
            }
            
        }
        else {
            res.status(404).json({msg: "Not Found"});
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

// Update the item data of an open order that the user has created
const updateItem = async (req, res) => {
    let { quantity } = req.body;
    let item_id = req.params.id;
    let { id } = req.user;
    
    try {
        let item = await ItemDAO.getByIdOpenOrder(item_id, id);
        
        if (item && item.quantity !== undefined) {  // Check if item exists
            item.quantity = quantity;
            let rowsUpdated = await ItemDAO.updateById(item_id, { quantity: item.quantity });
            
            if (rowsUpdated[0] > 0) {  // Check if rows were updated
                item = await ItemDAO.getById(item_id);  // Retrieve updated item
                res.status(200).json({ msg: "Item updated successfully", item });
            } else {
                res.status(404).json({ msg: "Item not found or update failed" });
            }
        } else {
            res.status(404).json({ msg: "Item not found or unauthorized" });
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

// Return the items of some close order and the total 
const getReciept = async (req, res) => {
    let order_id = req.params.id;

    try {
        let order = await OrderDAO.getById(order_id);
        if (order.customer_id == req.user.id) {     // Order belongs to logged customer
            let items = await ItemDAO.getByOrderId(order_id);
            let total = 0.0;                // Price of the order
            
            if (items.length > 0) {
                for (const item of items) {
                    let book = await BookDAO.getById(item.book_id);
                    total += (book.price * item.quantity);          // Sum the price of the item 
                }
                res.status(200).json({ msg: "Receipt: ", items, total });
            } else {
                res.status(404).json({ msg: "No items found for this order" });
            }
        }
        else {
            res.status(403).json({msg: "Forbidden"})
        }
        
    } catch (error) {
        res.status(500).json(error);
    }
};



module.exports = {
    customerInfo,
    update,
    deleteCustomer,
    checkout,
    newOrder,
    getOrder,
    deleteOrder,
    closeOrder,
    addToCart,
    removeFromCart,
    updateItem,
    getReciept
};