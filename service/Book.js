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
    },

    // Update method
    updateById: async (updatedBook, id) => {
        return await BookModel.update(updatedBook, {where: {book_id: id}});
    },

    //Delete method
    deleteById: async (id) => {
        return await BookModel.destroy({where: {book_id: id}});
    }
    
}