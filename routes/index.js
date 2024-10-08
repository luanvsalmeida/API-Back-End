var express = require('express');
var router = express.Router();
router.use(express.json());
const { sequelize } = require('../model/db');
const Admin = require('../service/Admin');
const Customer = require('../service/Customer');
const Book = require('../service/Book');
const Item = require('../service/Item');
const Order = require('../service/Order');
const { BooksData, CustomersData, ItemsData } = require('../helpers/installData');    // Data for the install route


// Database installation and first insertion
router.get('/install', async function(req, res, next) {
  // #swagger.summary = 'Rota para instalação da API com os dados iniciais.'
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

module.exports = router;