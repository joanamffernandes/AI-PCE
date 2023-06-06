var express = require('express');
var cors = require('cors')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const compositionRouter = require('./routes/composition');
const kpis = require('./routes/kpis')

var app = express();

// ###### MONGOOSE ########
const mongoose = require('mongoose');
const uri = "mongodb://localhost:9000/database";
mongoose.set('strictQuery', true);
mongoose.connect(uri)
    .then(() => console.log('Connected.'))
    .catch(() => console.log('Error connecting to MongoDB.'))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Configurar o middleware do cors
app.use(cors({
    origin: 'http://localhost:3000',// Permitir acesso apenas a este domínio
    methods: ['GET', 'POST'], // Permitir apenas estes métodos HTTP
    allowedHeaders: ['Content-Type'], // Permitir apenas estes cabeçalhos
    credentials: true,
    optionSuccessStatus: 200
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/composition', compositionRouter);
app.use('/kpis', kpis);

// Iniciar o servidor
var port = 8080
app.listen(port, () => {
    console.log('Server running at ' + port);
});

module.exports = app;
