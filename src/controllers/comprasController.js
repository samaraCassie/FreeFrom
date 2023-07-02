const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'us-cdbr-east-06.cleardb.net',
    user: 'be5f53017f38ab',
    password: '0a3c77ee',
    database: 'heroku_f1c7f7f6459dca3'
});

exports.compras = (req, res) => {
    const user = req.session.user;
    if(user){
        res.render('_compras', {user: true});
    }
    else{
        res.render('_compras', {user: false});
    }
}