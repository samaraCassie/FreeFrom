const app = require('express');
const route = app.Router();
const homeController = require('./src/controllers/homeController');
const produtoController = require('./src/controllers/produtosController');
const loginController = require('./src/controllers/loginController');
const cadastroController = require('./src/controllers/cadastroController');
const descricaoProdutos = require('./src/controllers/descricaoController');
const lojaController = require('./src/controllers/lojaController');
const perfilController = require('./src/controllers/perfilController');

route.get('/', homeController.paginaInicial);
route.get('/_Produtos', produtoController.paginaProdutos);
route.get('/_Login', loginController.loginPagina)
route.get('/_cadastro', cadastroController.paginaCadastro);
route.get('/_descricaoProduto', descricaoProdutos.paginaDesc);
route.get('/_PerfilLoja', lojaController.paginaLoja);
route.get('/_PerfilUser', perfilController.paginaPerfil);

module.exports = route;