const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'freefrom'
});

exports.pageEdit = (req, res) => {
    const user = req.session.user;
    const id = req.params.id;

    if(user){
        connection.query('SELECT * FROM vendedor WHERE id_usuario = ?', [user[0].id_usuario], (erro, result) => {
            if(erro) throw erro;
            if(result.length > 0){
                connection.query('SELECT * FROM produto WHERE id_produto = ?', [id], (error, results) => {
                    if(error) throw error;

                    res.render('_editProduto', {user: true, vendedor: true, errado: false, id: id, results: results});
                });
            }
            else{
                res.render('_editProduto', {user: true, vendedor: false});
            }
        });
    }
    else{
        res.render('_editProduto', {user: false, vendedor: false});
    }
}

exports.deleteProduto = (req, res) => {
    const id = req.params.id;

    connection.query('SELECT * FROM compra WHERE id_produto = ?', [id], (err, result, rows) => {
        if(err) throw err;


        if(result.length > 0){
            res.render('_proibido', {error: 'Você não pode excluir este produto!! Pois ele ja foi ou esta sendo comprado por uma pessoa'});
        }else{
            connection.query('SELECT * FROM itens_produto WHERE id_produto = ?', [id], (erro, results) => {
                if(erro) throw erro;

                if(results.length > 0){
                    res.render('_proibido', {error: 'Você não pode excluir este produto!! Pois ele ja foi ou esta sendo comprado por uma pessoa'});
                }else{
                    connection.query('DELETE FROM produto WHERE id_produto = ?', [id], (erro, results) => {
                        res.redirect('/_produtos');
                    });
                }
            });
        }
    });
}