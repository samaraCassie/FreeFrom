const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'us-cdbr-east-06.cleardb.net',
    user: 'be5f53017f38ab',
    password: '0a3c77ee',
    database: 'heroku_f1c7f7f6459dca3'
});

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
        connection.query('INSERT INTO itens_produto (id_usuario, id_produto, quantidade) VALUES (?, ?, ?)', [usuario, produto, qtd], (error, result) => {
            if(error) throw error

            res.redirect('/_descricaoProduto/' + id);
        });
    }   
}