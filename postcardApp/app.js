var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var lessMiddleware = require('less-middleware');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var quoteRouter = require('./routes/response');

const request = require('request');
const helper = require('./API_helper');
const pd = require('paralleldots');
const manipulator = require('./imagemanipulation/imagemanipulation');

var app = express();

// const port = process.env.PORT || 3000;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/quote', quoteRouter);

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




/*
app.set('view engine', 'hjs');

app.use((req, res, next) => {
    console.info(`Got request on ${req.path} (${req.method}).`);
    next();
});


app.listen(port, () => {
    console.info(`Server is listening on port ${port}.`);
    console.info('Available routes are:');
    app._router.stack.forEach((r) => {
        if (r.route && r.route.path) console.info(r.route.path);
    });
});
*/
app.get('/quote', (req, res) => {
        helper.standardCall('https://favqs.com/api/qotd')
        .then(res1 => { 
            pd.apiKey = 'gSLgAnmknvK9FbxLwV3vIpH9GhSNp74R6CFtvPbLbRw';
            pd.keywords(res1.quote.body)
            .then((response) => {
                console.log(res1.quote.body)
                console.log(response);
                let keyword = JSON.parse(response);
                let sorted = keyword.keywords.sort((a, b) => 
                Number(b.confidence_score) - Number(a.confidence_score));
                return sorted[0].keyword;
            })
            .catch((error) => {console.log(error)
        })
            .then(res2 => { 
                
                var url = 'https://pixabay.com/api/?key=14668696-1050eb2ce23d8700022954b86' +
                '&q=' + res2.split(" ")[0] + '&image_type=photo&orientation=horizontal';
                console.log(url);
                helper.standardCall(url)
        
                .then(res3 => {
                    var img = manipulator.generate(res3.hits[0].largeImageURL, res1.quote.body);
                    console.log(img);
                    //console.log(res3);
                    res.render('response.hjs', {
                    title: 'QuoteGenerator',
                    quote: res1.quote.body,
                    author: res1.quote.author
                 //   image:  img // res3.hits[0].largeImageURL
                    })
                
                })
                .catch(err => { res.send(err); })
        })
            .catch(err => { res.send(err); })
        })
        .catch(err => { res.send(err); })
      
})

module.exports = app;

