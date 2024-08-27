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
    // Read methods 
    getById: async (id) => {
        return await ItemModel.findByPk(id);
    },

    getByPage: async (page, limit) => {
        return await ItemModel.findAll({
            limit: limit,               // Amount of rows to return
            offset: limit * (page - 1)  // Starting point
        });
    },

    // Update method
    updateById: async (id, updatedItem) => {
        return await ItemModel.update(updatedItem, { where: { item_id: id } });
    },


    // Delete method
    deleteById: async (id) => {
        return await ItemModel.destroy({where: {item_id: id}});
    }
}