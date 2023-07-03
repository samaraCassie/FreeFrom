const db = require('../models/dbModel');

db.connect();

exports.addCarrinho = (req, res) => {
    const user = req.session.user

    if(user == "" || user == null){
        res.redirect('/_login');
    }
    else{
        const usuario = user[0].id_usuario;
        const produto = req.body.produto;
        const qtd = req.body.qtd;
        const id = req.body.produto;
        db.query('INSERT INTO itens_produto (id_usuario, id_produto, quantidade) VALUES (?, ?, ?)', [usuario, produto, qtd], (error, result) => {
            if(error) throw error

            res.redirect('/_descricaoProduto/' + id);
        });
    }   
}