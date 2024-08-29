const { ItemModel, OrderModel } = require('../model/db');

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

    getByOrderId: async (order_id) => {
        return await ItemModel.findAll({where: {order_id}});
    },

    // Get a Item of a specific customer
    getByIdAndCustomer: async (item_id, customer_id) => {
        let item = await ItemModel.findByPk(item_id);
        if (item) {
            let order = await OrderModel.findByPk(item.order_id);       
            if (order && order.customer_id == customer_id) {        // If the order belongs to the customer return the item 
                return item;
            }   
        }
        return {};
    },

    // Get a item of a specific order where a open order
    getByIdOpenOrder:  async (item_id, customer_id) => {
        let item = await ItemModel.findByPk(item_id);
        if (item) {
            let order = await OrderModel.findByPk(item.order_id);       
            if (order && order.customer_id == customer_id && order.is_open) {        // If the order belongs to the customer return the item 
                return item;
            }   
        }
        return {};
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