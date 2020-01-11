var express = require('express');
var router = express.Router();
const helper = require('../API_helper');

router.get('/', (req, res) => {

    helper.standardCall('https://favqs.com/api/qotd')
        .then(result => {
            res.render('quote.hjs', {
                title: 'QuoteGenerator',
                quote: result.quote.body,
                author: result.quote.author
            })
        })
        .catch(err => {
            res.send(err)
        })

});

module.exports = router;