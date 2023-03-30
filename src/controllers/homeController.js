exports.paginaInicial = (req, res) => {
    res.render('_index', {
        titulo: 'FreeFrom'
    });
}