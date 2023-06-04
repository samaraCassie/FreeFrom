const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'freefrom'
});

exports.pageEdit = (req, res) => {
    const user = req.session.user;

    if(user){
        connection.query('SELECT * FROM vendedor WHERE id_usuario = ?', [user[0].id_usuario], (erro, result) => {
            if(erro) throw erro;
            if(result.length > 0){
                res.render('_editProduto', {user: true, vendedor: true, errado: false});
            }
            else{
                res.render('_editProduto', {user: true, vendedor: false});
            }
        });
    }
    else{
        res.render('_editProduto', {user: false, vendedor: false});
    }
}

exports.editProduto = (req, res) => {
    const id = req.params.id;
    const nome = req.body.nome;
    const categoria = req.body.categoria;
    const descricao = req.body.descricao;
    const estoque = req.body.estoque;
    const path = req.file ? req.file.path : null;
    const preco = req.body.preco;
    const user = req.session.user;

    if(path != null){
        let imagem = path.slice(9);
    }

    if(user){
        connection.query('SELECT * FROM vendedor WHERE id_usuario = ?', [user[0].id_usuario], (erro, result) => {
            if(erro) throw erro;
            if(result.length > 0){
                if(path != null){
                    connection.query('UPDATE produto SET nome = ?, categoria = ?, descricao = ?, qtd_estoque = ?, preco_unit = ?, img = ? WHERE id_produto = ?', [nome, categoria, descricao, estoque, preco, imagem, id], (err, results) => {
                        if(err) throw err;
                        res.redirect('/_produtos');
                    });
                }else{
                    res.render('_editProduto', {user: true, vendedor: true, errado: true, error: 'Envie a imagem do produto!!'});
                }
            }else{
                res.render('_editProduto', {user: true, vendedor: false});
            }     
        });
    }else{
        res.render('_editProduto', {user: false, vendedor: false});
    }

    
}

exports.deleteProduto = (req, res) => {
    const id = req.params.id;

    connection.query('SELECT * FROM compra WHERE id_produto = ?', [id], (err, result, rows) => {
        if(err) throw err;


        if(result.length > 0){
            res.send('Você não pode excluir este produto!! Pois ele ja foi comprado por uma pessoa');
        }else{
            connection.query('DELETE FROM produto WHERE id_produto = ?', [id], (erro, results) => {
                res.send('Produto Removido com sucesso!');
            });
        }
    });
}