const BookDAO = require('../service/Book');

// Create a new book
const createBook = async (req, res) => {
    let {title, author, price, stock, publication_date, genre} = req.body;
    try {
        const book = await BookDAO.insert(title, author, price, stock, publication_date, genre);
        res.status(201).json({message: "Book created successfully", book: book});
    } catch (error) {
        res.status(400).json({error: "Failed to insert book"});
    }
}; 

// List books with pagination
const getBooks = async (req, res) => {
    let {page,limit} = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    if (!page || isNaN(page) || page <= 0) {
        return res.status(400).json({msg: "Invalid parameter for page"});
    }

    if (limit !== 5 && limit !== 10 && limit !== 30) {
        return res.status(400).json({msg: "Invalid parameter for limit"});
    }

    try {
        let books = await BookDAO.getByPage(page, limit);
        res.status(200).json({message: "Data retrieved successfully", books});
    } catch (error) {
        res.status(400).json({error: "Failed to retrieve data"});
    }
};

// Update book by it's id
const updateBook = async (req, res) => {
    let {id} = req.params;
    let {title, author, price, stock, publication_date, genre} = req.body;
    let updatedBook = {
        book_title: title,
        author: author,
        price: price,
        stock: stock,
        publication_date, publication_date,
        genre: genre
    }
    try {
        const rowsUpdated = await BookDAO.updateById(updatedBook, id);
        if (rowsUpdated[0] === 0) {
            res.status(404).json({msg: "Book not found"});
        }
        const book = await BookDAO.getById(id);
        res.status(200).json({msg: "Book updated successfully", Book: book});
    } catch (error) {
        res.status(500).json({error: "Failed to update data"});    
    }
};

// Delete book by it's id
const deleteBook = async (req, res) => {
    let {id} = req.params;
    try{ 
        const rowsDeleted = await BookDAO.deleteById(id);
        if (rowsDeleted === 0) {     // Checks if any row was deleted
            res.status(404).json({msg: "Book not found"});
        }
        res.status(200).json({msg: "Book deleted successfully"});
    } catch (error) {
        res.status(500).json({error: "Failed to delete data"});
    }
};

module.exports = {
    createBook, 
    getBooks,
    updateBook, 
    deleteBook
};