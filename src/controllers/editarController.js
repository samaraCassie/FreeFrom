const mysql = require('mysql');

// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'freefrom'
// });
exports.editarPage = (req, res) => {
    const user = req.session.user;
    if(user){
    connection.query('SELECT * FROM vendedor WHERE id_usuario = ?', [user[0].id_usuario], (err, results) => {
        if(err) throw err;
        if(results != ""){
            if(results[0].id_vendedor == req.params.id){
                res.render('_editar', {errado: false, loja: true, results: results});
            }
            else{
                res.render('_editar', {errado: false, loja: false, results: results});
            }
        }else{
            res.render('_editar', {errado: false, loja: false, results: null});
        }
    });
    }
    else{
        res.render('_editar', {errado: false, loja: false, results: null});
    }
}

exports.postEditar = (req, res) => {
    const id = req.params.id;
    const nome = req.body.loja;
    const cnpj = req.body.cnpj;
    const slogan = req.body.slogan;
    const sobre = req.body.sobre;

    connection.query('UPDATE vendedor SET nome_loja = ?, cnpj = ?, slogan = ?, sobre = ? WHERE id_vendedor = ?', [nome, cnpj, slogan, sobre, id], (erro, result) => {
        if(erro) throw erro
        
        res.redirect('/_Perfilloja/' + id);
    });
}