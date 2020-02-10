var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser')
var logger = require('morgan');
var cors = require('cors');
var indexRouter = require('./routes/index');
var quoteRouter = require('./routes/quote');
var galleryRouter = require('./routes/gallery')
var factRouter = require('./routes/fact')
var aboutRouter = require('./routes/about')
var apiGalleryRouter = require('./routes/api/v1/postcards/gallery')
var apiRandomRouter = require('./routes/api/v1/postcards/random')
var apiCreateRouter = require('./routes/api/v1/postcards/create')
var userInputRouter = require('./routes/userinput')
var imageRouter = require('./routes/topsecret/images')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(bodyParser.urlencoded({ extended : false }))
app.use(bodyParser.json())

app.use('/', indexRouter);
app.use('/quote', quoteRouter);
app.use('/gallery', galleryRouter)
app.use('/fact', factRouter)
app.use('/api/v1/postcards/gallery', apiGalleryRouter)
app.use('/api/v1/postcards/random', apiRandomRouter)
app.use('/api/v1/postcards/create', apiCreateRouter)
app.use('/about', aboutRouter)
app.use('/topsecret/images', imageRouter)
app.use('/userinput', userInputRouter)

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
