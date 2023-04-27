const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'freefrom'
});

function atualizarQuantidadeEmEstoque(qtd, produtoId) {
    const sql = `UPDATE produto SET qtd_estoque = qtd_estoque - ? WHERE id_produto = ?`;
    const params = [qtd, produtoId];
  
    // Execute a consulta SQL
    connection.query(sql, params, (err, result) => {
      if (err) throw err;
      
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
        const qtd = req.body.qtd;
        connection.query('INSERT INTO compra (data, total_compra, id_vendedor, id_cliente, id_produto, quantidade) VALUES (?, ?, ?, ?, ?, ?)', [data, valor, vendedor, usuario, produto, qtd], (error, result) => {
            if(error) throw error

            atualizarQuantidadeEmEstoque(qtd, produto);
            res.redirect(`_descricaoProduto/${produto}`);
        });
    }   
}