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
          connection.query('SELECT SUM(quantidade) AS total FROM compra WHERE id_produto = ?', [id], (err, resultado) => {
            if(resultado == undefined){
              resultado == null;
              res.render('_descricaoProduto', { produtos: results, vendedor: result, vendidos: resultado, comprado: false});
            }
            else{
              res.render('_descricaoProduto', { produtos: results, vendedor: result, vendidos: resultado[0].total, comprado: false});
            }
          });
        });
    });
}