exports.paginaCadastro = (req, res) =>{
    res.render('_cadastro');
}

exports.postCadastro = (req, res) => {
    const email = req.body.email;
    const senha = req.body.senha;
  
    const sql = 'INSERT INTO usuario (email, senha) VALUES (?, ?)';
    const values = [email, senha];
  
    connection.query(sql, values, (err, result) => {
      if (err) {
        console.error('Erro ao inserir dados no banco de dados: ' + err.stack);
        return;
      }
  
      console.log('Dados inseridos com sucesso no banco de dados');
      res.redirect('/_Produtos');
    });
}