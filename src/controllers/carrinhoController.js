const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'freefrom'
});

exports.paginaCarrinho = (req, res) => {
    const user = req.session.user;
    if(user){
        connection.query('SELECT * FROM itens_produto WHERE id_usuario = ?', [user[0].id_usuario], (err, results, fields) => {
            if(err) throw err;
            let produtos = []
            if(results != "" || results != undefined || results != null){
                connection.query('SELECT COUNT(*) FROM itens_produto WHERE id_usuario = ?', [user[0].id_usuario], (error, resultado) => {
                    if (error) throw error;
                    const count = resultado[0]['COUNT(*)'];
                    const promises = [];
                  
                    for (let i = 0; i < count; i++) {
                      const id = results[i].id_produto;
                      const promise = new Promise((resolve, reject) => {
                        connection.query('SELECT * FROM produto WHERE id_produto = ?', [id], (erro, result) => {
                          if (erro) reject(erro);
                          resolve(result);
                        });
                      });
                      promises.push(promise);
                    }
                  
                    Promise.all(promises)
                      .then((produtos) => {
                        res.render('_Carrinho', {produtin: true, produtos: produtos, results: results, user: true});
                      })
                      .catch((erro) => {
                        throw erro;
                      });
                  });
            }
            else{
                res.render('_Carrinho', {produtos: "", produtin: false, user: true});
            }
        });
    }
    else{
        res.render('_Carrinho', {produtos: "", produtin: false, user: false});
    }
}

function atualizarQuantidadeEmEstoque(qtd, produtoId) {
  const sql = `UPDATE produto SET qtd_estoque = qtd_estoque - ? WHERE id_produto = ?`;
  const params = [qtd, produtoId];

  connection.query(sql, params, (err, result) => {
    if (err) throw err;
    
  });
}

exports.confirmarCompra = (req, res) => {
    let feito = 0;
    const total = req.body.total;
    const i = req.body.i;
    const user = req.session.user;
    const id_user = user[0].id_usuario

    for(let index = 0; index<i; index++){
      const qtd = req.body[`qtd${index}`];
      const id_itens = req.body[`id${index}`];
      const id_produto = req.body[`id_produto${index}`];

      connection.query('INSERT INTO compra (data, total_compra, quantidade, id_produto, id_usuario) VALUES (?, ?, ?, ?, ?)', [new Date, total, qtd, id_produto, id_user], (error, results) => {
        if(error) throw error;
        
        connection.query('DELETE FROM itens_produto WHERE id_itens_produto = ?', [id_itens], (err, result) => {
          atualizarQuantidadeEmEstoque(qtd, id_produto);
          feito++
          if(feito == i){
            res.redirect('/_produtos');
          }
        });
      }); 
    }
}

exports.removerProduto = (req, res) => {
    const id_itens = req.body.id_itens;
    connection.query("DELETE FROM itens_produto WHERE id_itens_produto = ?", [id_itens], (err, result) => {
      if(err) throw err;

      res.redirect('_carrinho');
    });
}