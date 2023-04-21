const app = require('express');
const route = app.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "public/Img/");
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + file.originalname);
    }
})

const upload = multer({storage});

const homeController = require('./src/controllers/homeController');
const produtoController = require('./src/controllers/produtosController');
const loginController = require('./src/controllers/loginController');
const cadastroController = require('./src/controllers/cadastroController');
const descricaoProdutos = require('./src/controllers/descricaoController');
const lojaController = require('./src/controllers/lojaController');
const perfilController = require('./src/controllers/perfilController');
const sobreController = require('./src/controllers/sobreController');
const chatController = require('./src/controllers/chatController');
const carrinhoController = require('./src/controllers/carrinhoController');
const cadastroProdutoController = require('./src/controllers/cadastroProdutoController');
const editarProdutoController = require('./src/controllers/editarProdutoController');
const logOutController = require('./src/controllers/logOutController');
const comprarController = require('./src/controllers/comprarController');

//Rotas da home
route.get('/', homeController.paginaInicial);

//Rotas da pagina de produtos
route.get('/_Produtos', produtoController.paginaProdutos);
route.post('/_Produtos', produtoController.produtosPost);

//Rotas do login
route.get('/_Login', loginController.loginPagina);
route.post('/_Login', loginController.loginPost);

//Rotas de logOut
route.post('/_logOut', logOutController.logOut);

//Rotas do cadastro
route.get('/_cadastro', cadastroController.paginaCadastro);
route.post('/_cadastro', cadastroController.postCadastro);

//Rotas da pagina de descrição dos produtos
route.get('/_descricaoProduto/:id', descricaoProdutos.paginaDesc);

//Rotas do perfil da loja
route.get('/_PerfilLoja/:id', lojaController.paginaLoja);

//Rotas do perfil do usuario
route.get('/_PerfilUser', perfilController.paginaPerfil);

//Rotas do sobre nós
route.get('/_Sobre', sobreController.paginaSobre);

//Rotas do carrinho
route.get('/_Carrinho', carrinhoController.paginaCarrinho);

//Rota para comprar produto
route.post('/_comprar', comprarController.comprar);

//Rotas do cadastro de produtos
route.get('/produtosCadastrar', cadastroProdutoController.paginaCadastroProduto);
route.post('/produtosCadastrar', upload.single('img'), cadastroProdutoController.postProduto);

module.exports = route;