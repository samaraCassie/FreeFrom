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
        result.forEach((row) => {
                products.push({
                id: row.id,
                nome: row.nome,
                descricao: row.descricao
                });
            });
            res.render('_Produtos', { produtos: products, num_produtos: results[0].num_produtos });
        });
    });
}


