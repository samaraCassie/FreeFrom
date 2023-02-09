const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController')
const produtoController = require('./src/controllers/produtosController')

route.get('/', homeController.paginaInicial);
route.get('/', produtoController.paginaProdutos);

module.exports = route;