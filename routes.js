const app = require('express');
const route = app.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './frontend/Img'); // Pasta onde os arquivos serão salvos
    },
    filename: function(req, file, cb) {
      cb(null, Date.now() + file.originalname); // Nome do arquivo original
    }
  });
  const upload = multer({ storage: storage });

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
const editarLojaController = require('./src/controllers/editarController');
const logOutController = require('./src/controllers/logOutController');
const addCarrinhoController = require('./src/controllers/addCarrinhoController');
const cadastroLojaController = require('./src/controllers/cadastroLojaController');
const editarCapaController = require('./src/controllers/mudarCapaController');
const editarFotoController = require('./src/controllers/mudarFotoController');
const comprasController = require('./src/controllers/comprasController');
const editRemovePorudutosController = require('./src/controllers/funcoesProdutosController');
const pageController = require('./src/controllers/404Controller');
const editarProdutoController = require('./src/controllers/editarProdutoController');

//Rotas da home
route.get('/', (req, res) => {
  res.send('Ola');
});

//Rotas da pagina de produtos
route.get('/_Produtos', produtoController.paginaProdutos);
route.get('/_pesquisa', produtoController.produtosPost);

//Rotas do login
route.get('/_Login', loginController.loginPagina);
route.post('/_Login', loginController.loginPost);

//Rotas de logOut
route.get('/_logOut', logOutController.logOut);

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
route.post('/_remove', carrinhoController.removerProduto);
route.post('/_confirmarCompra', carrinhoController.confirmarCompra);

//Rota para comprar produto
route.post('/_addCarrinho', addCarrinhoController.addCarrinho);

//Rotas do cadastro da loja
route.get('/_cadastroLoja', cadastroLojaController.cadastroLoja);
route.post('/_cadastroLoja',  upload.fields([{name: 'img'}, {name: 'backImg'}]),cadastroLojaController.postcadastroloja);

//Rotas do cadastro de produtos
route.get('/_CadastroProdutos', cadastroProdutoController.paginaCadastroProduto);
route.post('/upload', upload.single('file'), cadastroProdutoController.postProduto);

//Rota para editar as fotos da loja
route.post('/_fotoCapa', upload.single('back_img'), editarCapaController.mudarCapa);
route.post('/_fotoPerfil', upload.single('img'), editarFotoController.mudaFoto);

//Rotas para editar a loja
route.get('/_editar/:id', editarLojaController.editarPage);
route.post('/_editar/:id', editarLojaController.postEditar);

//Rotas para pagina de compras
route.get('/_compras', comprasController.compras);

//Rotas para edição e exclusão de produtos
route.get('/_editProd/:id', editRemovePorudutosController.pageEdit);
route.get('/_removeProd/:id', editRemovePorudutosController.deleteProduto);
route.post('/_editProduto/:id', upload.single('file'), editarProdutoController.editProduto);

//Rota para paginas não encontradas
route.get('/_404', pageController.page);

//Rota para proibição
route.get('/_proibido', )

module.exports = route;