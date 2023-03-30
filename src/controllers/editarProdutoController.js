const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'freefrom'
});

exports.paginaEdicaoProduto = (req, res) => {
    res.render('_editProdutos');
}

exports.postEdicaoProdutos = (req, res) => {
    const nome = req.body.name;
    const categoria = req.body.categoria;
    const descricao = req.body.descricao;
    const estoque = req.body.qtdEstoque;
    const img = req.body.img;
    const preco = req.body.preco;

    const sql = 'UPDATE produto SET nome = ?, descricao = ?, preco_unit = ?, qtd_estoque = ?, img = ?, categoria = ? WHERE id = ?';
    const values = [nome, descricao, preco, estoque, img, categoria, id];
    connection.query(sql, values, (err, result) => {
        if (err) {
            console.error('Erro ao atualizar dados no banco de dados: ' + err.stack);
            return;
        }

        console.log('Dados atualizados com sucesso no banco de dados');
        res.redirect('/_PerfilLoja');
    });
}

exports.getId = (req, res) => {
    const query = 'SELECT * FROM produto WHERE id_produto = ?';
    const id = req.params.id;
  
    connection.query(query, id, function(error, results, fields) {
      if (error) throw error;
      res.json(results);
    });
};

exports.deleteProd = (req, res) => {
  const query = 'DELETE FROM tabela WHERE id = ?';
  const id = req.params.id;

  connection.query(query, id, function(error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
}