const db = require('../models/dbModel');

db.connect();

exports.mudarCapa = (req, res) => {
    const path = req.file.path;
    const id = req.body.id;

    let imagem = path.slice(9);

    db.query('UPDATE vendedor SET back_img = ? WHERE id_vendedor = ?', [imagem, id], (err, result) => {
        if(err) throw err;

        res.redirect('/_PerfilLoja/' + id);
    });
}