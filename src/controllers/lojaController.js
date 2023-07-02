const mysql = require('mysql');
const navbarController = require('./navBarController');

const connection = mysql.createConnection({
    host: 'us-cdbr-east-06.cleardb.net',
    user: 'be5f53017f38ab',
    password: '0a3c77ee',
    database: 'heroku_f1c7f7f6459dca3'
});

exports.paginaLoja = (req, res) => {
    navbarController(req, (navBar) => {
    if(req.session.user){
        const id = req.params.id;
        const user = req.session.user;
        connection.query('SELECT * FROM vendedor WHERE id_vendedor = ?', [id], (error, result, fields) => {
            if(error) throw error
            connection.query('SELECT * FROM produto WHERE id_vendedor = ?', [id], (err, results, field) => {
                if(err) throw err
                connection.query('SELECT * FROM vendedor WHERE id_usuario = ?', [user[0].id_usuario], (erro, resultado) => {
                    if(erro) throw erro
                    if(resultado != "" || resultado != null){
                        res.render('_PerfilLoja', {vendedor: result, produtos: results, user: true, usuario: user, resultado: resultado, navBar: navBar});
                    }
                    else{
                        res.render('_PerfilLoja', {vendedor: result, produtos: results, user: false, usuario: user, resultado: null, navBar: navBar});
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
                    res.render('_PerfilLoja', {vendedor: result, produtos: results, user: false, navBar: navBar});
                });
            });
    }
}, 'loja')
}