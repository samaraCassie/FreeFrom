const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'freefrom'
});
exports.editarPage = (req, res) => {
    const id = req.params.id;
    connection.query('SELECT * FROM vendedor WHERE id_vendedor = ?', [id], (err, results) => {
        res.render('_editar', {errado: false, loja: results});
    });
}

exports.postEditar = (req, res) => {
    const id = req.params.id;
    const nome = req.body.loja;
    const cnpj = req.body.cnpj;
    const slogan = req.body.slogan;
    const sobre = req.body.sobre;
    
    connection.query('UPDATE vendedor SET nome_loja = ?, cnpj = ?, slogan = ?, sobre = ? WHERE id_vendedor = ?', [nome, cnpj, slogan, sobre, id], (erro, result) => {
        if(erro) throw erro
    
        res.redirect('_Perfilloja');
    });
}