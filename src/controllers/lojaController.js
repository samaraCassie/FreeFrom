const navbarController = require('./navBarController');
const db = require('../models/dbModel');

db.connect();

exports.paginaLoja = (req, res) => {
    navbarController(req, (navBar) => {
    if(req.session.user){
        const id = req.params.id;
        const user = req.session.user;
        db.query('SELECT * FROM vendedor WHERE id_vendedor = ?', [id], (error, result, fields) => {
            if(error) throw error
            db.query('SELECT * FROM produto WHERE id_vendedor = ?', [id], (err, results, field) => {
                if(err) throw err
                db.query('SELECT * FROM vendedor WHERE id_usuario = ?', [user[0].id_usuario], (erro, resultado) => {
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
        db.query('SELECT * FROM vendedor WHERE id_vendedor = ?', [id], (error, result, fields) => {
            if(error) throw error
            db.query('SELECT * FROM produto WHERE id_vendedor = ?', [id], (err, results, field) => {
                    if(err) throw err
                    res.render('_PerfilLoja', {vendedor: result, produtos: results, user: false, navBar: navBar});
                });
            });
    }
}, 'loja')
}