const createError = require('http-errors');
var cookieSession = require('cookie-session');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');
const mongoose = require('mongoose');
const config = require('./config');

mongoose.connect(config.db, { useNewUrlParser: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('db connect');
});

const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const singupRouter = require('./routes/singup');
const profileRouter = require('./routes/profile');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  sassMiddleware({
    src: path.join(__dirname, 'public/sass'),
    dest: path.join(__dirname, 'public'),
    indentedSyntax: false, // true = .sass and false = .scss
    sourceMap: true
  })
);
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  cookieSession({
    name: 'session',
    keys: config.keySession,

    maxAge: config.maxAgeSession
  })
);

//path dostępny globalnie - dzięki temu będą ścieżki w plikach pug odczytywać aktywną zakładkę
// app.use(function(req, res, next) {
//   res.locals.path = req.path;

//   next();
// });

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/singup', singupRouter);
app.use('/profile', profileRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
