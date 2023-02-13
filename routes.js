//I am the router
const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController')

route.get('/', homeController.paginaInicial);

module.exports = route;
