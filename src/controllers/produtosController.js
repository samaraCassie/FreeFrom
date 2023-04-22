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
                // Renderiza a página do dashboard com as informações do usuário
                res.render('_Produtos', { produtos: result, user: user, usuario: true, resultado: true});
              }
            else{
                res.render('_Produtos', { produtos: result, usuario: false, resultado: true});
              }
        });
    }

exports.produtosPost = (req, res) => {
    const pesquisa = req.body.pesquisa;
    var resultado = true

    connection.query(`SELECT * FROM produto where nome LIKE "%${pesquisa}%" OR descricao LIKE "%${pesquisa}% " OR categoria LIKE "%${pesquisa}%"`, (error, result, fields) => {
        if (error) throw error;
        console.log(result);
        if(result == ""){
            result.push('Nenhum produto encontrado!');
            resultado = false;
        }

        if (req.session.user) {
            // Recupera as informações do usuário da sessão
            const user = req.session.user;
            // Renderiza a página do dashboard com as informações do usuário
            res.render('_Produtos', { produtos: result, user: user, usuario: true, resultado: resultado});
          }
        else{
            res.render('_Produtos', { produtos: result, usuario: false, resultado: resultado});
          }
    });
}