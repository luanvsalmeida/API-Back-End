const { OrderModel } = require('../model/db');

module.exports = {
    // Create method
    insert: async (date, customer_id) => {
        return await OrderModel.create({
            order_date: new Date(date), 
            customer_id: customer_id
        });
    },
    // Read method 
    getById: async (id) => {
        return await OrderModel.findByPk(id);
    },
    // Update method
    update: async (order, id) => {
        return await OrderModel.update(order, { where: { id: id } });
    }
    
}