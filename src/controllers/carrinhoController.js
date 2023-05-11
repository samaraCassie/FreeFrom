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
            if(results != "" || results != undefined || results != null){
                connection.query('SELECT COUNT(*) FROM itens_produto WHERE id_usuario = ?', [user[0].id_usuario], (error, resultado) => {
                    if(error) throw error;
                    const resultuado = [ { 'COUNT(*)': 2 } ];
                    const count = resultuado[0]['COUNT(*)'];
                    for(let i =0; i<count; i++){
                        connection.query('SELECT * FROM produto WHERE id_produto = ?', [results[i].id_produto], (erro, result) =>{
                            if(erro) throw erro;
                            let produtos = []
                            produtos.push(result);
                            res.render('_Carrinho', {produtos: produtos});
                        });
                    }
                });
                
            }
            else{

            }
        });
    }
    
}