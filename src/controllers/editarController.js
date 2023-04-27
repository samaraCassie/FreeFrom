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
    const nome = req.body.loja;
    const cnpj = req.body.cnpj;
    const slogan = req.body.slogan;
    const sobre = req.body.sobre;
    
    


    if(path == null || path == ""){
        const path2 = req.files['backImg'][0].path
        let img2 = path2.slice(7);
        connection.query('UPDATE vendedor SET nome_loja = ?, cnpj = ?, slogan = ?, sobre = ?, back_img = ?', [nome, cnpj, slogan, sobre, img2], (erro, result) => {
            if(erro) throw erro
    
            res.redirect('_Perfilloja');
        });
    }
    else if(path2 == null || path2 == ""){
        const path = req.files['img'][0].path
        let img = path.slice(7);
        connection.query('UPDATE vendedor SET nome_loja = ?, cnpj = ?, slogan = ?, sobre = ?, img = ?', [nome, cnpj, slogan, sobre, img], (erro, result) => {
            if(erro) throw erro
    
            res.redirect('_Perfilloja');
        });
    }
    else if(path == null || path == "" && path2 == null || path2 == ""){
        connection.query('UPDATE vendedor SET nome_loja = ?, cnpj = ?, slogan = ?, sobre = ?', [nome, cnpj, slogan, sobre], (erro, result) => {
            if(erro) throw erro
    
            res.redirect('_Perfilloja');
        });
    }
    else{
        connection.query('UPDATE vendedor SET nome_loja = ?, cnpj = ?, slogan = ?, sobre = ?, img = ?, back_img = ?', [nome, cnpj, slogan, sobre, img, img2], (erro, result) => {
            if(erro) throw erro
    
            res.redirect('_Perfilloja');
        });
    }
}