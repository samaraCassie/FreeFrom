const app = require('express');
const route = app.Router();
const mysql = require('mysql2/promise');
const mysqls = require('mysql2');

const connection = mysqls.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'freefrom'
  });

async function conectarBancoDeDados() {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'freefrom'
    });
    return connection;
}

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

route.get('/', homeController.paginaInicial);
route.get('/_Produtos', produtoController.paginaProdutos);
route.get('/_Login', loginController.loginPagina)
route.post('/_Login', async (req, res) => {
    const connection = await conectarBancoDeDados();
    const email = req.body.email;
    const senha = req.body.senha;
  
    const [rows, fields] = await connection.execute('SELECT * FROM usuario WHERE email = ? AND senha = ?', [email, senha]);
  
    if (rows.length > 0) {
      res.redirect('/_Produtos')
    } else {
      res.status(401).send('Dados de login incorretos!');
    }
  });
route.get('/_cadastro', cadastroController.paginaCadastro);
route.post('/_cadastro', (req, res) => {
    const usuario = req.body.usuario;
    const email = req.body.email;
    const senha = req.body.senha;
    const dataNascimento = req.body.data;
    const sexo = req.body.sexo;
    const endereço = req.body.Endereço;
    const numero = req.body.Numero;
    const cidade = req.body.Cidade;
    const uf = req.body.UF;
    
    const sql = 'INSERT INTO usuario (email, usuario, senha, data_nascimento, sexo, endereco, numero, cidade, uf) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [email, usuario, senha, dataNascimento, sexo, endereço, numero, cidade, uf];
    connection.query('SELECT * FROM usuario WHERE email = ?', email, (error, results, fields) => {
        if (error) throw error;

        if (results.length > 0) {
            // Usuário já existe no banco de dados
            res.send('Usuário já cadastrado!');
        } else {
            connection.query(sql, values, (err, result) => {
            if (err) {
                console.error('Erro ao inserir dados no banco de dados: ' + err.stack);
                return;
            }
        
            console.log('Dados inseridos com sucesso no banco de dados');
            res.redirect('/_Produtos');
            });
        }
  });
});
route.get('/_descricaoProduto', descricaoProdutos.paginaDesc);
route.get('/_PerfilLoja', lojaController.paginaLoja);
route.get('/_PerfilUser', perfilController.paginaPerfil);
route.get('/_Sobre', sobreController.paginaSobre);
route.get('/_Carrinho', carrinhoController.paginaCarrinho);

module.exports = route;