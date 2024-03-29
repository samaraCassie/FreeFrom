const db = require('../models/dbModel');

db.connect();

exports.paginaCadastroProduto = (req, res) => {
    const user = req.session.user;
    if(user){
        db.query('SELECT id_usuario, id_vendedor FROM vendedor WHERE id_usuario = ?', [user[0].id_usuario], (err, results, field) => {
            if(err) throw err;
            // Renderiza a página do dashboard com as informações do usuário
            if(results != ""){
                db.query("SELECT * FROM categoria", (error, result) => {
                    if(error) throw error;

                    res.render('_CadastroProdutos', {errado: false, vendedor: true, categorias: result});
                })
            }
            else{
                res.render('_CadastroProdutos', {errado: false, vendedor: false, categorias: null});
            }
        });
    }
    else{
        res.render('_CadastroProdutos', {errado: false, vendedor: false, categorias: null});
    }
}

exports.postProduto = (req, res) => {
    const nome = req.body.nome;
    const categoria = req.body.categoria;
    const descricao = req.body.descricao;
    const estoque = req.body.estoque;
    const path = req.file ? req.file.path : null;
    const preco = req.body.preco;

    let imagem;
    if(path != null){
        imagem = path.slice(9);
    }
    
    const user = req.session.user;
    if(user){
        db.query('SELECT id_usuario, id_vendedor FROM vendedor WHERE id_usuario = ?', [user[0].id_usuario], (err, results, field) => {
            if(err) throw err;
            if(estoque <= 0){
                const erro = "Para cadastrar um produto você precisa ter no minímo 1 no estoque!!";
                res.render("_CadastroProdutos", {errado: true, error: erro, vendedor: true})
            }else{
                if(path == null){
                    const erro = "Envie uma imagem do produto!!";
                    res.render("_CadastroProdutos", {errado: true, error: erro, vendedor: true})
                }else{
                    const sql = 'INSERT INTO produto (nome, descricao, preco_unit, qtd_estoque, img, categoria, id_vendedor) VALUES (?, ?, ?, ?, ?, ?, ?)';
                    const values = [nome, descricao, preco, estoque, imagem, categoria, results[0].id_vendedor];
                    db.query(sql, values, (err, result) => {
                        if (err) {
                            console.error('Erro ao inserir dados no banco de dados: ' + err.stack);
                            return;
                        }
                        res.redirect('/_Produtos');
                    });
                }
            }
        });
    }
    
}