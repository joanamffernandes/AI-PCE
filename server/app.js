var express = require('express');
var cors = require('cors')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

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

// Iniciar o servidor
var port = 8080
app.listen(port, () => {
    console.log('Serviver running at ' + port);
});

module.exports = app;
