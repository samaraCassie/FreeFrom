const mysqls = require('mysql2');

const connection = mysqls.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'freefrom'
});

exports.paginaProdutos = (req, res) => {

        connection.query('SELECT * FROM produto', (error, result, fields) => {
        if (error) throw error;
            if (req.session.user) {
                // Recupera as informações do usuário da sessão
                const user = req.session.user;

                connection.query('SELECT id_usuario, id_vendedor FROM vendedor WHERE id_usuario = ?', [user[0].id_usuario], (err, results, field) => {
                    if(err) throw err;
                    // Renderiza a página do dashboard com as informações do usuário
                    if(results != ""){
                        res.render('_Produtos', { produtos: result, user: user, usuario: true, resultado: true, vendedor: true, idLoja: results[0].id_vendedor});
                    }
                    else{
                        res.render('_Produtos', { produtos: result, user: user, usuario: true, resultado: true, vendedor: false});
                    }
                });
              }
            else{
                res.render('_Produtos', { produtos: result, usuario: false, resultado: true, vendedor: false});
              }
        });
    }

exports.produtosPost = (req, res) => {
    const pesquisa = req.body.pesquisa;


    connection.query(`SELECT * FROM produto where nome LIKE "%${pesquisa}%" OR descricao LIKE "%${pesquisa}% " OR categoria LIKE "%${pesquisa}%"`, (error, result, fields) => {
        if (error) throw error;
        if(result == ""){
            result.push('Nenhum produto encontrado!');

        }

        if (req.session.user) {
            // Recupera as informações do usuário da sessão
            const user = req.session.user;
            // Renderiza a página do dashboard com as informações do usuário
            connection.query('SELECT id_usuario FROM vendedor WHERE id_usuario = ?', [user[0].id_usuario], (err, results, field) => {
                if(err) throw err;
                // Renderiza a página do dashboard com as informações do usuário
                if(results != ""){
                    res.render('_Produtos', { produtos: result, user: user, usuario: true, resultado: true, vendedor: true, idLoja: results[0].id_vendedor});
                }
                else{
                    res.render('_Produtos', { produtos: result, user: user, usuario: true, resultado: true, vendedor: false});
                }
            });
          }
        else{
            res.render('_Produtos', { produtos: result, usuario: false, resultado: true, vendedor: false});
          }
    });
}