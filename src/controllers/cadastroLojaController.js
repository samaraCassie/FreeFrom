const db = require('../models/dbModel');

db.connect();

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
    try{
        const user = req.session.user

        const nome = req.body.loja;
        const cnpj = req.body.cnpj;
        const slogan = req.body.slogan;
        const sobre = req.body.sobre;
        const id = user[0].id_usuario;
        const path = req.files['img'] ? req.files['img'][0].path : null;
        const path2 = req.files['backImg'] ? req.files['backImg'][0].path : null;


        if (!path && !path2){
            const erro = "Envie uma imagem de perfil e de fundo da loja!! não pode ser nulo";
            res.render('_cadastroLoja', {errado: true, error: erro, logado: true});
        }
        else if (!path){
            const erro = "Envie uma imagem de perfil!! não pode ser nulo!";
            res.render('_cadastroLoja', {errado: true, error: erro, logado: true});
        }
        else if (!path2){
            const erro = "Envie uma imagem de fundo da loja!! não pode ser nulo!";
            res.render('_cadastroLoja', {errado: true, error: erro, logado: true});
        }

        

        let img = path.slice(9);
        let img2 = path2.slice(9);


        db.query("INSERT INTO vendedor (nome_loja, slogan, cnpj, sobre, img, back_img, id_usuario) VALUES (?, ?, ?, ?, ?, ?, ?)", [nome, slogan, cnpj, sobre, img, img2, id], (error, result, fields) => {
            if(error) throw error;

            
            res.redirect(`/_PerfilLoja/${result.insertId}`);
        });
    }catch(error){
        if (error instanceof TypeError) {
            res.render('_cadastroLoja', {errado: true, error: 'Algo deu errado!! Você provavelmente deixou sua sessão expirar!! confira se esta logado e tente novamente!!', logado: true});
          } else {
            throw error; // Lançar o erro caso não seja do tipo TypeError
          }
    }
}