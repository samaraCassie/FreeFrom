const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'freefrom'
});

exports.paginaLoja = (req, res) => {
    if(req.session.user){
        const id = req.params.id;
        const user = req.session.user;
        connection.query('SELECT * FROM vendedor WHERE id_vendedor = ?', [id], (error, result, fields) => {
            if(error) throw error
            connection.query('SELECT * FROM produto WHERE id_vendedor = ?', [id], (err, results, field) => {
                if(err) throw err
                connection.query('SELECT id_usuario FROM vendedor WHERE id_usuario = ?', [user[0].id_usuario], (erro, resultado) => {
                    if(erro) throw erro
                    if(resultado != ""){
                        res.render('_PerfilLoja', {vendedor: result, produtos: results, user: true});
                    }
                    else{
                        res.render('_PerfilLoja', {vendedor: result, produtos: results, user: false});
                    }
                });
            });
        });
    }
    else{
        const id = req.params.id;
        connection.query('SELECT * FROM vendedor WHERE id_vendedor = ?', [id], (error, result, fields) => {
            if(error) throw error
            connection.query('SELECT * FROM produto WHERE id_vendedor = ?', [id], (err, results, field) => {
                    if(err) throw err
                    res.render('_PerfilLoja', {vendedor: result, produtos: results, user: false});
                });
            });
    }
}