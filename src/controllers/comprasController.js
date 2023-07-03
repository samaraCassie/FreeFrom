const db = require('../models/dbModel');

db.connect();

exports.compras = (req, res) => {
    const user = req.session.user;
    if(user){
        res.render('_compras', {user: true});
    }
    else{
        res.render('_compras', {user: false});
    }
}