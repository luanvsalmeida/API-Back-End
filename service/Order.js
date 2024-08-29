const { OrderModel } = require('../model/db');

module.exports = {
    // Create method
    insert: async (customer_id, is_open) => {
        return await OrderModel.create({
            order_date: new Date(), 
            customer_id: customer_id,
            is_open: is_open
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

    getByCustomer: async (customer_id ,page, limit) => {
        return await OrderModel.findAll({
            limit: limit,               // Amount of rows to return
            offset: limit * (page - 1),  // Starting point
            where: {customer_id: customer_id}  
        });
    },
    // Update method
    updateById: async (order, id) => {
        return await OrderModel.update(order, { where: { order_id: id } });
    },

    // Delete method
    deleteById: async (id) => {
        return await OrderModel.destroy({where: {order_id: id}});
    },
    // Delete the order only if it belongs to a a specific customer
    deleteByIdAndCustomer: async (customer_id, order_id) => {
        return await OrderModel.destroy({where: {customer_id, order_id}});
    }
}