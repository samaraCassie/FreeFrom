const mysqls = require('mysql2');

const connection = mysqls.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'freefrom'
});

exports.paginaProdutos = (req, res) => {
    
    connection.query('SELECT COUNT(*) as num_produtos FROM produto', (error, results) => {
        if (error) {
            console.error('Erro ao executar consulta SQL:', error);
            return;
        }
        const products = [];
        connection.query('SELECT * FROM produto', (error, result, fields) => {
        if (error) throw error;
        // result.forEach((row) => {
        //         products.push({
        //         id: row.id,
        //         nome: row.nome,
        //         descricao: row.descricao
        //         });
        //     });
            if (req.session.user) {
                // Recupera as informações do usuário da sessão
                const user = req.session.user;
                // Renderiza a página do dashboard com as informações do usuário
                res.render('_Produtos', { produtos: result, num_produtos: results[0].num_produtos, user: user, usuario: true, pesquisa: false});
              }
            else{
                res.render('_Produtos', { produtos: result, num_produtos: results[0].num_produtos, usuario: false, pesquisa: false});
              }
        });
    });
}

exports.produtosPost = (req, res) => {
    const pesquisa = req.body.pesquisa;

    connection.query(`SELECT * FROM produto where nome LIKE "%${pesquisa}%" OR descricao LIKE "%${pesquisa}%"`, (error, result, fields) => {
        if (error) throw error;

        if (req.session.user) {
            // Recupera as informações do usuário da sessão
            const user = req.session.user;
            // Renderiza a página do dashboard com as informações do usuário
            res.render('_Produtos', { produtos: result, user: user, usuario: true, pesquisa: true});
          }
        else{
            res.render('_Produtos', { produtos: result, usuario: false, pesquisa: true});
          }
    });
}