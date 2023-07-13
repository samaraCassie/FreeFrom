// Importando o módulo mysql
const mysql = require('mysql2');

// Configurações de conexão com o banco de dados
const connection = mysql.createConnection({
    host: 'LocalHost',
    user: 'root',
    password: '',
    database: 'FreeFrom',
    connectTimeout: 0
  });

// Função para conectar ao banco de dados
function connect() {
  connection.connect((err) => {
    if (err) {
      console.error('Erro ao conectar ao banco de dados:', err);
    } else {
      console.log('Conectado ao banco de dados!');
    }
  });
}

// Função para executar comandos SQL
function query(sql, params, callback) {
  connection.query(sql, params, (err, result) => {
    if (err) {
      console.error('Erro ao executar comando SQL:', err);
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
}

// Exportando as funções para uso em outros arquivos
module.exports = {
  connect,
  query,
  connection
};