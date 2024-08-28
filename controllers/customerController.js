const CustomerDAO = require('../service/Customer');

// Lists customer data
const customerInfo = async (req, res) => {

};

// Update customer data
const update = async (req, res) => {
    
};

// Delete customer own  data
const deleteCustomer = async (req, res) => {
    
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
    
};

// Get all orders that the user has done
const getOrder = async (req, res) => {
    
};

// Delete some order that the user has created, only if it is open
const deleteOrders = async (req, res) => {
    
};

// Define a order as closed
const closeOrder = async (req, res) => {
    
};

// Create a item for a specific  order
const addToCart = async (req, res) => {
    
};

// Delete an item of some open order that the user has created
const removeFromCart = async (req, res) => {
    
};

// Update the item data of an open order that the user has created
const updateItem = async (req, res) => {
    
};

// Retur the items of some close order and the total
const getReciept = async (req, res) => {
    
};


module.exports = {
    customerInfo,
    update,
    deleteCustomer,
    checkout,
    newOrder,
    getOrder,
    deleteOrders,
    closeOrder,
    addToCart,
    removeFromCart,
    updateItem,
    getReciept
};