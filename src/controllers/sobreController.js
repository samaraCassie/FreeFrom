const navbarController = require('./navBarController');

exports.paginaSobre = (req, res) => {
    navbarController(req, (navBar) => {
        res.render('_Sobre', {navBar: navBar});
    }, 'sobre');
}