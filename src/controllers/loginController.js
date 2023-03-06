const mysql = require('mysql2/promise');
const md5 = require('md5');
let nome;

async function conectarBancoDeDados() {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'freefrom'
    });
    return connection;
}

exports.loginPagina = (req, res) => {
    res.render('_Login');
}

exports.loginPost = async (req, res) => {
    const connection = await conectarBancoDeDados();
    const email = req.body.usuario;
    const senha = md5(req.body.senha);
  
    const [rows, fields] = await connection.execute('SELECT usuario, senha FROM usuario WHERE usuario = ? AND senha = ?', [email, senha]);
    nome = rows[0].usuario;
    console.log(nome)
    if (rows.length > 0) {
      res.redirect('/_Produtos')
    } else {
      res.status(401).send('Dados de login incorretos!');
    }
  }