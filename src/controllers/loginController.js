const mysql = require('mysql');
const md5 = require('md5');


const connection =  mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'freefrom'
    });


exports.loginPagina = (req, res) => {
    res.render('_Login', {errado: false});
}

exports.loginPost = async (req, res) => {
    const email = req.body.email;
    const senha = md5(req.body.senha);
  
    connection.query('SELECT * FROM usuario WHERE email = ? AND senha = ?', [email, senha], (error, results, fields) => {
      if (error) {
        // se ocorrer um erro, exibir mensagem de erro
        res.render('_Login', { error: 'Ocorreu um erro ao fazer login. Tente novamente.', errado: true});
      } else if (results.length === 0) {
        // se não houver resultados, exibir mensagem de erro
        res.render('_Login', { error: 'Email ou senha inválidos.', errado: true});
      } else {
        // se o usuário existir, redirecionar para a página inicial
        req.session.user = results;
        res.redirect('/_Produtos')
        nome = results[0].usuario;
      }
    });
  }
