const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const flash = require("connect-flash")
const session = require('express-session');

// conexão com banco de dados
const db = require('./src/models/dbModel');

db.connect();

db.connection.on('connect', () => {
    app.emit('Pronto');
});

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

app.use((err, req, res, next) => {
  // Check if the error is an internal server error
  if (err instanceof Error && err.status === 500) {
    // Handle the internal server error
    console.error('Internal Server Error:', err);
    // Send an appropriate response to the client
    res.status(500).json({ error: 'Internal Server Error' });
    res.status(500).send('Deu erro kkk');
  } else {
    // Pass the error to the next error handling middleware
    next(err);
  }
});

app.on('Pronto', () => {
    app.listen(port, () => {
      console.log('Acessar http://localhost:' + port);
      console.log('Servidor executando na porta ' + port);
  });
});
