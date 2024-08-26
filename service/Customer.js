const { CustomerModel } = require('../model/db');

module.exports = {
    // Create method
    insert: async (name, mail, phone, address, password) => {
        return await CustomerModel.create({
            customer_name: name,
            customer_mail: mail, 
            customer_phone: phone, 
            customer_address: address,
            customer_password: password
        });
    },
    // Read methods 
    getById: async (id) => {
        return await CustomerModel.findByPk(id);
    },

    getByName: async (name) => {
        return await CustomerModel.findAll({ where: {customer_name: name}}); 
    },

    getByLogin: async (mail, password) => {   
        return await CustomerModel.findAll({ where: { customer_mail: mail, customer_password: password } });
    },

    getAll: async () => {
        return await CustomerModel.findAll();
    },

    getByPage: async (page, limit) => {
        return await CustomerModel.findAll({
            limit: limit,               // Amount of rows to return
            offset: limit * (page - 1)  // Starting point
        });
    },

    // Update method
    updateById: async(id, updatedData) => {
        return await CustomerModel.update(updatedData, {where: {customer_id: id}});
    },

    // Delete method
    deleteById: async (id) => {
        return await CustomerModel.destroy({where: {customer_id: id}});
    }
    
}