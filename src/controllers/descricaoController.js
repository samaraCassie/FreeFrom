const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'freefrom'
});

exports.paginaDesc = (req, res) => {
    const id = req.params.id;
    connection.query('SELECT * FROM produto WHERE id_produto = ?', [id], (error, results, fields) => {
        if (error) throw error;
        
        connection.query('SELECT * FROM vendedor WHERE id_vendedor = ?', [results[0].id_vendedor], (error, result, fields) => {
          if(error) throw error;

          res.render('_descricaoProduto', { produtos: results, vendedor: result, comprado: false});
        });
    });
}