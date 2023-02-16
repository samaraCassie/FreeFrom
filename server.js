require('dotenv').config();

const express = require('express');
const app = express();
//const mongoose = require('mongoose');
/*mongoose.set('strictQuery', true);
mongoose.connect(process.env.CONNECTIONSTRING).then(() => {
    console.log('Conexão com base de dados = true');
    app.emit('Pronto');
}).catch(e => console.log('Erro com o Banco de dados!!:   ', e));*/

const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');

const routes = require('./routes');
const path = require('path');
const meuMiddleware = require('./src/middlewares/middleware.js');
const e = require('express');

app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/imagem', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', '.jpg'));
  });

/*const sessionOptions = session({
    secret: 'SalveSalveHHH',
    store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24* 7,
        httpOnly: true
    }
});
app.use(sessionOptions);
app.use(flash());*/

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

//Meus middlewares
app.use(meuMiddleware);
app.use(routes);


app.listen(3000, () => {
    console.log('Acessar http://localhost:3000');
    console.log('Servidor executando na porta 3000');
});

