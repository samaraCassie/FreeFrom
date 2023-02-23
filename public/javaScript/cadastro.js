const form = document.querySelector('#formulario');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'freefrom'
});

form.addEventListener('submit', function(e){
    e.preventDefault();

    const inputEmail = document.querySelector('#email');
    const inputUsuario = document.querySelector('#usuario');
    const inputSenha = document.querySelector('#senha');
    const inputEndereco = document.querySelector('#endereco');
    const inputNumero = document.querySelector('#numero');
    const inputCidade = document.querySelector('#cidade');

    const email = String(inputEmail.value);
    const usuario = String(inputUsuario.value);
    const senha = String(inputSenha.value);
    const endereco = String(inputEndereco.value);
    const numero = Number(inputNumero.value);
    const cidade = String(inputCidade.value);

    console.log(email, usuario, senha, endereco, numero, cidade);

    connection.query(
        'INSERT INTO usuario (email, nome, senha, endereco, numero, cidade) VALUES (?, ?, ?, ?, ?, ?)',
        [email, usuario, senha, endereco, numero, cidade],
        function(err, results, fields) {
          if (err) {
            console.log('Erro ao adicionar valores na tabela: ' + err.message);
          } else {
            console.log('Valores adicionados com sucesso!');
          }
      
          // Fecha a conexão com o banco de dados
          connection.end();
        }
      );
});



