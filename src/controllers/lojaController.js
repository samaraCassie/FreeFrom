const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'freefrom'
});

exports.paginaLoja = (req, res) => {
    const id = req.params.id;
    connection.query('SELECT * FROM vendedor WHERE id_vendedor = ?', [id], (error, result, fields) => {
        if(error) throw error
        connection.query('SELECT * FROM produto WHERE id_vendedor = ?', [id], (err, results, field) => {
            if(err) throw err

            res.render('_PerfilLoja', {vendedor: result, produtos: results});
        });
    })
}