const { ItemModel } = require('../model/db');

module.exports = {
    // Create method
    insert: async (quantity, order_id, book_id) => {
        return await ItemModel.create({
            quantity: quantity, 
            order_id: order_id, 
            book_id: book_id
        });
    },
    // Read method 
    getById: async (id) => {
        return await ItemModel.findByPk(id);
    }
    
}