exports.paginaInicial = (req, res) => {
    res.render('_index');
}

exports.post = (req, res) => {
    res.send(req.body);
}