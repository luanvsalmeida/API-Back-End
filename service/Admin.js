const { AdminModel } = require('../model/db');

module.exports = {
    // Create method
    insert: async (name, mail, phone, hire_date, password) => {
        return await AdminModel.create({
            admin_name: name,
            admin_mail: mail, 
            admin_phone: phone, 
            hire_date: hire_date,
            admin_password: password
        });
    },
    // Read methods
    getById: async (id) => {
        return await AdminModel.findByPk(id);
    },

    getByLogin: async (mail, password) => {
        return await AdminModel.findAll({where: {admin_mail: mail, admin_password: password}})
    },

    getAll: async () => {
        return await AdminModel.findAll();
    },

    getByPage: async (page, limit) => {
        return await AdminModel.findAll({
            limit: limit,               // Amount of rows to return
            offset: limit * (page - 1)  // Starting point
        });
    }
    


}