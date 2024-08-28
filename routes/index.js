require('dotenv').config();
var express = require('express');
var router = express.Router();
router.use(express.json());
var jwt = require('jsonwebtoken');
const { sequelize } = require('../model/db');
const Admin = require('../service/Admin');
const Customer = require('../service/Customer');
const Book = require('../service/Book');
const Item = require('../service/Item');
const Order = require('../service/Order');
const { BooksData, CustomersData, ItemsData } = require('../helpers/installData');


// Database installation and first insertion
router.get('/install', async function(req, res, next) {
  // Create database
  await sequelize.sync({ force: true });

  // Insert values
  let admin = await Admin.insert('Mario Gotze', 'mariogotze@mail.com', '+55 11 94232-2313', '2024-08-22T12:34:56Z', 'gotze123');
  admin = await Admin.getById(admin.admin_id);
  console.log(admin.admin_name);
  for (let i = 0; i < 5; i++) {
    //admin = await Admin.insert(AdminsData.names[i], AdminsData.mails[i], AdminsData.phoneNumbers[i], new Date(), AdminsData.passwords[i]);
    await Customer.insert(CustomersData.names[i], CustomersData.mails[i], CustomersData.phoneNumbers[i], CustomersData.addresses[i], CustomersData.passwords[i]);
    await Book.insert(BooksData.titles[i], BooksData.authors[i],BooksData.prices[i], BooksData.stocks[i], BooksData.publicationDates[i], BooksData.genres[i]);
  }
  for (let i = 1; i <= 5; i++)
    await Order.insert(i);

  for (let i = 0; i < 10; i++)
      await Item.insert(ItemsData.quantities[i], ItemsData.order_id[i], ItemsData.book_id[i]);

  

  res.json({ mensagem: 'Banco instalado com sucesso' });
});

// sign up method (create a new user)
router.post('/signUp', async (req, res) => {
  try {
    let {name, mail, password, phone, address} = req.body;
    const customer = await Customer.insert(name, mail, phone, address, password);
    let { customer_id, customer_mail } = customer;
    const token = jwt.sign({ customer_id, customer_mail, type: "customer"  }, process.env.SECRET, {    // Creating json web token
      expiresIn: 3600
    });
    //res.cookie('jwt', token, { httpOnly: true, httpOnly: true, maxAge: 3600000});

    res.status(201).json({message: 'Customer created successfully', customer});
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(409).json({ msg: "Email is already in use" });
    } else {
      res.status(500).json({ error: "Failed to register user" });
    }
  }
});

// Read books
router.get('/getBooks', async (req, res) => {
  let {page, limit} = req.query;

  page = parseInt(page);
  limit = parseInt(limit);

  if (!page || isNaN(page) || page <= 0) {
      return res.status(400).json({msg: "Invalid parameter for page"});
  }

  if (limit !== 5 && limit !== 10 && limit !== 30) {
      return res.status(400).json({msg: "Invalid parameter for limit"});
  }

  try {
      let books = await Book.getByPage(page, limit);
      res.status(200).json({message: "Data retrieved successfully", books});
  } catch (error) {
      console.error(error);
      res.status(400).json({error: "Failed to retrieve data"});
  }
});



module.exports = router;
