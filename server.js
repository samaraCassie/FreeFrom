const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const flash = require("connect-flash")
const session = require('express-session');

//conexão com banco de dados
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'freefrom'
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar com o banco de dados: ' + err.stack);
    return;
  }

  console.log('Conexão bem-sucedida com o banco de dados');
  app.emit('Pronto');
});

const routes = require('./routes');
const path = require('path');
const meuMiddleware = require('./src/middlewares/middleware.js');
const middlewareProdutos = require('./src/middlewares/produtosMiddleware');

app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/imagem', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', '.jpg'));
  });
  
app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(session({ cookie: { maxAge: 60000 }, 
  secret: 'woot',
  resave: false, 
  saveUninitialized: false
}));
app.use(flash());
//Meus middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(meuMiddleware);
app.use('_Produtos', middlewareProdutos);
app.use(routes);

app.on('Pronto', () => {
    app.listen(3000, () => {
      console.log('Acessar http://localhost:3000');
      console.log('Servidor executando na porta 3000');
  });
});
