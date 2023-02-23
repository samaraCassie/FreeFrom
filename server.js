const express = require('express');
const app = express();

//conexão com banco de dados
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'freefrom'
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar: ' + err.stack);
    return;
  }

  console.log('Conexão bem sucedida com o ID: ' + connection.threadId);
  app.emit('Pronto');
});
//-----------------

const routes = require('./routes');
const path = require('path');
const meuMiddleware = require('./src/middlewares/middleware.js');
const e = require('express');

app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/imagem', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', '.jpg'));
  });

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

//Meus middlewares
app.use(meuMiddleware);
app.use(routes);

app.on('Pronto', () => {
    app.listen(3000, () => {
      console.log('Acessar http://localhost:3000');
      console.log('Servidor executando na porta 3000');
  });
});
