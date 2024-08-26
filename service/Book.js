const { BookModel } = require('../model/db');

module.exports = {
    // Create method
    insert: async (title, author, price, stock, publication_date, genre) => {
        return await BookModel.create({
            book_title: title,
            author: author, 
            price: price, 
            stock: stock,
            publication_date: new Date(publication_date),
            genre: genre
        });
    },
    // Read method 
    getById: async (id) => {
        return await BookModel.findByPk(id);
    },

    getByPage: async (page, limit) => {
        return await BookModel.findAll({
            limit: limit,               // Amount of rows to return
            offset: limit * (page - 1)  // Starting point
        });
    }
    
}