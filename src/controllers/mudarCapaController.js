const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'us-cdbr-east-06.cleardb.net',
    user: 'be5f53017f38ab',
    password: '0a3c77ee',
    database: 'heroku_f1c7f7f6459dca3'
});

exports.mudarCapa = (req, res) => {
    const path = req.file.path;
    const id = req.body.id;

    let imagem = path.slice(9);

    connection.query('UPDATE vendedor SET back_img = ? WHERE id_vendedor = ?', [imagem, id], (err, result) => {
        if(err) throw err;

        res.redirect('/_PerfilLoja/' + id);
    });
}