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
        request('https://favqs.com/api/qotd', (err, qres, body) => {
            var json = JSON.parse(body);
            var quote = json.quote;
            console.log(body);
            res.render('response.hjs', {
                title: 'QuoteGenerator',
                quote: '"' + quote.body,
                author: quote.author
            });
        });     
});

