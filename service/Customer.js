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
        let customer = await CustomerModel.findAll({ where: { customer_mail: mail, customer_password: password } });
        console.log('hello');
        return customer;
    },

    getAll: async () => {
        return await CustomerModel.findAll();
    }
    
}