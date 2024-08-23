var express = require('express');
var router = express.Router();

const { sequelize } = require('../model/db');



/* GET home page. */
router.get('/install', async function(req, res, next) {
  await sequelize.sync({ force: true });
  res.json({ mensagem: 'Banco instalado com sucesso' });
});

module.exports = router;
