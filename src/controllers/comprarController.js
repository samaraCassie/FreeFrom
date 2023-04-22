const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'freefrom'
});

function atualizarQuantidadeEmEstoque(produtoId) {
    const sql = `UPDATE produto SET qtd_estoque = qtd_estoque - 1 WHERE id_produto = ?`;
    const params = [produtoId];
  
    // Execute a consulta SQL
    connection.query(sql, params, (err, result) => {
      if (err) throw err;
      console.log(`Quantidade em estoque atualizada para o produto ${produtoId}`);
    });
  }

exports.comprar = (req, res) => {
    const user = req.session.user

    if(user == "" || user == null){
        res.redirect('/_login');
    }
    else{
        const data = new Date()
        const usuario = user[0].id_usuario
        const vendedor = req.body.vendedor;
        const valor = req.body.valor;
        const produto = req.body.produto;
        connection.query('INSERT INTO compra (data, total_compra, id_vendedor, id_cliente, id_produto) VALUES (?, ?, ?, ?, ?)', [data, valor, vendedor, usuario, produto], (error, result) => {
            if(error) throw error

            atualizarQuantidadeEmEstoque(produto);
            res.redirect(`_descricaoProduto/${produto}`);
        });
    }   
}