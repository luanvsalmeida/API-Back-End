const OrderDAO =  require('../service/Order');

// Create a new order for any user (restricted for administrators)
const createOrder = async (req, res) => {
    let {customer_id} = req.body;
    try {
        const order = await OrderDAO.insert(customer_id);
        res.status(201).json({message: "Order created successfully", order});
    } catch (error) {
        res.status(400).json({error: "Failed to create order"});
    }
};

// List all orders (restricted for administrators)
const getOrders = async (req, res) => {
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
};

// Update the order from any user, open or closed (restricted for administrators)
const updateOrder = async (req, res) => {
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
};

// Delete any order, open or closed (restricted for administrators)
const deleteOrder = async (req, res) => {
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
};

module.exports = {
    createOrder,
    getOrders,
    updateOrder,
    deleteOrder
};