const mysqls = require('mysql2');
const md5 = require('md5');

const connection = mysqls.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'freefrom'
  });


exports.paginaCadastro = (req, res) =>{
    res.render('_cadastro');
}

exports.postCadastro = (req, res) => {
  const usuario = req.body.usuario;
  const email = req.body.email;
  const senha = md5(req.body.senha);
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
}