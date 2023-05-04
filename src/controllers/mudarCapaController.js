const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'freefrom'
});

exports.mudarCapa = (req, res) => {
    const path = req.file.path;
    const id = req.body.id;

    let imagem = path.slice(7);

    console.log(imagem, id);

    connection.query('UPDATE vendedor SET back_img = ? WHERE id_vendedor = ?', [imagem, id], (err, result) => {
        if(err) throw err;

        res.redirect('/_PerfilLoja/' + id);
    });
}