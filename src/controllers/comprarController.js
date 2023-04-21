const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'freefrom'
});

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
            res.redirect(`_descricaoProduto/${produto}`);
        });
    }   
}