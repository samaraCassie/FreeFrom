const db = require('../models/dbModel');

db.connect();

exports.paginaProdutos = (req, res) => {

        db.query('SELECT * FROM produto', (error, result, fields) => {
        if (error) throw error;
            if (req.session.user) {
                // Recupera as informações do usuário da sessão
                const user = req.session.user;

                db.query('SELECT id_usuario, id_vendedor FROM vendedor WHERE id_usuario = ?', [user[0].id_usuario], (err, results, field) => {
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
    const pesquisa = req.query.pesquisa;

    let pesquisa2 = removeQuotes(pesquisa);

    db.query(`SELECT * FROM produto AS p INNER JOIN categoria AS c ON p.categoria = c.id_categoria where nome LIKE "%${pesquisa2}%" OR descricao LIKE "%${pesquisa2}%" OR c.categoria LIKE "%${pesquisa2}%"`, (error, result, fields) => {
        if (error) throw error
        if(result == ""){
            if (req.session.user) {
                // Recupera as informações do usuário da sessão
                const user = req.session.user;
                // Renderiza a página do dashboard com as informações do usuário
                db.query('SELECT id_usuario FROM vendedor WHERE id_usuario = ?', [user[0].id_usuario], (err, results, field) => {
                    if(err) throw err;
                    // Renderiza a página do dashboard com as informações do usuário
                    if(results != ""){
                        res.render('_Produtos', { produtos: result, user: user, usuario: true, resultado: false, vendedor: true, idLoja: results[0].id_vendedor});
                    }
                    else{
                        res.render('_Produtos', { produtos: null, user: user, usuario: true, resultado: false, vendedor: false, idLoja: results[0].id_vendedor});
                    }
                });
            }
            else{
                res.render('_Produtos', { produtos: result, usuario: false, resultado: false, vendedor: false});
            }
        }
        else{
            if (req.session.user) {
                // Recupera as informações do usuário da sessão
                const user = req.session.user;
                // Renderiza a página do dashboard com as informações do usuário
                db.query('SELECT id_usuario FROM vendedor WHERE id_usuario = ?', [user[0].id_usuario], (err, results, field) => {
                    if(err) throw err;
                    // Renderiza a página do dashboard com as informações do usuário
                    if(results != ""){
                        res.render('_Produtos', { produtos: result, user: user, usuario: true, resultado: true, vendedor: true, idLoja: results[0].id_vendedor});
                    }
                    else{
                        res.render('_Produtos', { produtos: null, user: user, usuario: true, resultado: true, vendedor: false, idLoja: results[0].id_vendedor});
                    }
                });
            }
            else{
                res.render('_Produtos', { produtos: result, usuario: false, resultado: true, vendedor: false});
            }
        }
        
    });
}

function removeQuotes(variable) {
    if (typeof variable === 'string') {
      return variable.replace(/["';]/g, '');
    } else {
      return variable;
    }
  }