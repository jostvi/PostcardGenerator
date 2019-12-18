const express = require('express');
const request = require('request');
const helper = require('./API_helper');
const app = express();

const port = process.env.PORT || 3000;

app.set('view engine', 'hjs');

app.use((req, res, next) => {
    console.info(`Got request on ${req.path} (${req.method}).`);
    next();
});

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/about', (req, res) => {
    res.send('About Something');
});

app.listen(port, () => {
    console.info(`Server is listening on port ${port}.`);
    console.info('Available routes are:');
    app._router.stack.forEach((r) => {
        if (r.route && r.route.path) console.info(r.route.path);
    });
});

app.get('/quote', (req, res) => {
        helper.standardCall('https://favqs.com/api/qotd')
        .then(res1 => { 
            helper.standardCall('https://pixabay.com/api/?key=14668696-1050eb2ce23d8700022954b86' +
            '&q=flowers&image_type=photo')
            .then(res2 => {
                res.render('response.hjs', {
                title: 'QuoteGenerator',
                quote: res1.quote.body,
                author: res1.quote.author,
                image: res2.hits[0].webformatURL
                })
            })
            .catch(err => { res.send(err); })
        })
        .catch(err => { res.send(err); })
      
})


