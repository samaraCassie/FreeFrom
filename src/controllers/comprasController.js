const mysql = require('mysql');

// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'freefrom'
// });

exports.compras = (req, res) => {
    const user = req.session.user;
    if(user){
        res.render('_compras', {user: true});
    }
    else{
        res.render('_compras', {user: false});
    }
}