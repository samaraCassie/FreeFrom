const mysql = require('mysql2/promise');

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
    const email = req.body.email;
    const senha = req.body.senha;
  
    const [rows, fields] = await connection.execute('SELECT * FROM usuario WHERE email = ? AND senha = ?', [email, senha]);
  
    if (rows.length > 0) {
      res.redirect('/_Produtos')
    } else {
      res.status(401).send('Dados de login incorretos!');
    }
  }