const ItemDAO = require('../service/Item');

// Create a new item for any order (restricted for administrators)
const createItem = async (req, res) => {
    let {quantity, order_id, book_id} = req.body;
    try {
        const item = await ItemDAO.insert(quantity, order_id, book_id);
        res.status(201).json({message: "Item created successfully", item});
    } catch (error) {
        res.status(400).json({error: "Failed to create item"});
    }
};

// List all items (restricted for administrators)
const getItems = async (req, res) => {
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
};

// Update the item from any order, open or closed (restricted for administrators)
const updateItem = async (req, res) => {
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
};

// Delete any item from any, open or closed (restricted for administrators)
const deleteItem = async (req, res) => {
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
};


module.exports = {
    createItem,
    getItems,
    updateItem,
    deleteItem
};