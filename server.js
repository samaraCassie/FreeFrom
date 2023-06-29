const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const flash = require("connect-flash")
const session = require('express-session');

//conexão com banco de dados
const mysql = require('mysql2');

// const connection = mysql.createConnection({
//   host: 'us-cdbr-east-06.cleardb.net',
//   user: 'be5f53017f38ab',
//   password: '0a3c77ee',
//   database: 'heroku_f1c7f7f6459dca3'
// });

// connection.connect((err) => {
//   if (err) {
//     console.error('Erro ao conectar com o banco de dados: ' + err.stack);
//     return;
//   }

//   console.log('Conexão bem-sucedida com o banco de dados');
//   app.emit('Pronto');
// });

const routes = require('./routes');
const path = require('path');
const meuMiddleware = require('./src/middlewares/middleware.js');

app.use(express.urlencoded({extended: true}));
// app.use(express.static(path.join(__dirname, 'frontend')));
app.use(express.static(path.join(__dirname, 'frontend')));

app.get('/imagem', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', '.jpg'));
  });
  
app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(session({ cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, 
  secret: 'woot',
  resave: false, 
  saveUninitialized: true
}));
app.use(flash());
//Meus middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(meuMiddleware.middleWare);
app.use(routes);


const port = process.env.PORT || 3000;
app.use((req, res) => {
  res.status(404).render('_404');
});

// app.on('Pronto', () => {
    app.listen(port, () => {
      console.log('Acessar http://localhost:' + port);
      console.log('Servidor executando na porta ' + port);
  });
// });
