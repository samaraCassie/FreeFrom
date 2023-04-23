exports.paginaEditar = (req, res) => {
    res.render('_editar', {user: req.session.user});
}