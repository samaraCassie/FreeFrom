const mysqls = require('mysql2');
const md5 = require('md5');
const validator = require('validator');

const connection = mysqls.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'freefrom'
  });


exports.cadastroLoja = (req, res) => {
    const user = req.session.user;
    if(user != null){
        res.render('_cadastroLoja', {errado: false, user: user, logado: true});
    }
    else{
        res.render('_cadastroLoja', {errado: false, logado: false});
    }
}

exports.postcadastroloja = (req, res) => {
    const user = req.session.user

    const nome = req.body.loja;
    const cnpj = req.body.cnpj;
    const slogan = req.body.slogan;
    const sobre = req.body.sobre;
    const id = user[0].id_usuario;
    const path = req.files['img'][0].path
    const path2 = req.files['backImg'][0].path
    console.log(path);
    console.log(path2);

    let img = path.slice(7);
    let img2 = path2.slice(7);

    connection.query("INSERT INTO vendedor (nome_loja, slogan, cnpj, sobre, img, back_img, id_usuario) VALUES (?, ?, ?, ?, ?, ?, ?)", [nome, slogan, cnpj, sobre, img, img2, id], (error, result, fields) => {
        if(error) throw error;

        res.redirect('_Produtos');
    });
}