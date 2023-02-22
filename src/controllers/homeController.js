const HomeModel = require('../models/homeModel');

HomeModel.create({
    titulo: 'Carros',
    desc: 'Carroskkkkk'
}).then(dados => console.log(dados)).catch(e => console.log(e));

exports.paginaInicial = (req, res) => {
    res.render('_index');
}