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
                        res.render('_Carrinho', { produtos: produtos, results: results, user: true});
                      })
                      .catch((erro) => {
                        throw erro;
                      });
                  });
            }
            else{
                res.render('_Carrinho', {produtos: null, user: true});
            }
        });
    }
    else{
        res.render('_Carrinho', {produtos: null, user: false});
    }
}

exports.confirmarCompra = (req, res) => {
    const total = req.body.total;
    const id_usuario = req.session.user[0].id_usuario;
    const id_itens_produto = req.body.id; 
    
}