const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'freefrom'
});


exports.paginaCadastroProduto = (req, res) => {
    res.render('/_CadastroProdutos');
}

exports.postProduto = (req, res) => {
    const nome = req.body.name;
    const categoria = req.body.categoria;
    const descricao = req.body.descricao;
    const estoque = req.body.qtdEstoque;
    const img = req.body.img;
    const preco = req.body.preco;

    const sql = 'INSERT INTO produto (nome, descricao, preco_unit, qtd_estoque, img, categoria) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [nome, descricao, preco, estoque, img, categoria];
    connection.query(sql, values, (err, result) => {
        if (err) {
            console.error('Erro ao inserir dados no banco de dados: ' + err.stack);
            return;
        }

        console.log('Dados inseridos com sucesso no banco de dados');
        res.redirect('/_PerfilLoja');
    });
}