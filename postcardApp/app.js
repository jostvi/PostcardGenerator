var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var quoteRouter = require('./routes/quote');
var galleryRouter = require('./routes/gallery')
var factRouter = require('./routes/fact')
var apiGalleryRouter = require('./routes/api/gallery')
var apiQuoteRouter = require('./routes/api/quote_postcard')
var apiFactRouter = require('./routes/api/fact_postcard')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/quote', quoteRouter);
app.use('/gallery', galleryRouter)
app.use('/fact', factRouter)
app.use('/api/gallery', apiGalleryRouter)
app.use('/api/quote_postcard', apiQuoteRouter)
app.use('/api/fact_postcard', apiFactRouter)

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Request-With, Content-Type, Accept");
//   next();
// })

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
