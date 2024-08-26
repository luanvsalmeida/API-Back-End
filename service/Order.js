const { OrderModel } = require('../model/db');

module.exports = {
    // Create method
    insert: async (customer_id) => {
        return await OrderModel.create({
            order_date: new Date(), 
            customer_id: customer_id
        });
    },
    // Read method 
    getById: async (id) => {
        return await OrderModel.findByPk(id);
    },

    getByPage: async (page, limit) => {
        return await OrderModel.findAll({
            limit: limit,               // Amount of rows to return
            offset: limit * (page - 1)  // Starting point
        });
    },
    // Update method
    update: async (order, id) => {
        return await OrderModel.update(order, { where: { id: id } });
    }
    
}