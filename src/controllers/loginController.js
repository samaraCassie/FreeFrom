const mysql = require('mysql');
const crypto = require('crypto');

function cripitografar(dados) {
  const hash = crypto.createHash('sha256');
  hash.update(dados);
  return hash.digest('hex');
}

function verificarSenha(senha, hashCriptografado) {
  const novoHash = cripitografar(senha);
  return novoHash === hashCriptografado;
}


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
    const senha = req.body.senha;
  
    connection.query('SELECT * FROM usuario WHERE email = ?', [email ], (error, results, fields) => {
      if (error) {
        // se ocorrer um erro, exibir mensagem de erro
        res.render('_Login', { error: 'Ocorreu um erro ao fazer login. Tente novamente.', errado: true});
      } else if (results.length === 0) {
        // se não houver resultados, exibir mensagem de erro
        res.render('_Login', { error: 'Email inválido.', errado: true});
      } else {
        const correspondenciaSenha = verificarSenha(senha, results[0].senha);
        if(correspondenciaSenha){
          req.session.user = results;
          res.redirect('/_Produtos')
          nome = results[0].usuario;
        }
        else{
          res.render('_Login', { error: 'Senha inválida.', errado: true});
        }
      }
    });
  }
