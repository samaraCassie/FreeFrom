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
const connection = await conectarBancoDeDados();
const [rows, fields] = await connection.execute('SELECT usuario FROM usuario WHERE usuario = ?' [usuario]);
exports.paginaProdutos = (req, res) => {
    res.render('_Produtos', {usuario: 'Sim'});
}