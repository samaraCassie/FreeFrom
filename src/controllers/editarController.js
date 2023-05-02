const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'freefrom'
});
exports.editarPage = (req, res) => {
    const user = req.session.user;
    if(user){
    connection.query('SELECT id_vendedor FROM vendedor WHERE id_usuario = ?', [user[0].id_usuario], (err, results) => {
        if(err) throw err;
        if(results != ""){
            if(results[0].id_vendedor == req.params.id){
                res.render('_editar', {errado: false, loja: true});
            }
            else{
                res.render('_editar', {errado: false, loja: false});
            }
        }else{
            res.render('_editar', {errado: false, loja: false});
        }
    });
    }
    else{
        res.render('_editar', {errado: false, loja: false});
    }
}

exports.postEditar = (req, res) => {
    const id = req.params.id;
    const nome = req.body.loja;
    const cnpj = req.body.cnpj;
    const slogan = req.body.slogan;
    const sobre = req.body.sobre;

    console.log(id, nome, cnpj)
    
    connection.query('UPDATE vendedor SET nome_loja = ?, cnpj = ?, slogan = ?, sobre = ? WHERE id_vendedor = ?', [nome, cnpj, slogan, sobre, id], (erro, result) => {
        if(erro) throw erro
    
        res.redirect('/_Perfilloja/' + id);
    });
}