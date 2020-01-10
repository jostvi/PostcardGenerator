var express = require('express');
var router = express.Router();
const helper = require('../API_helper');

router.get('/', (req, res) => {

    helper.standardCall('https://favqs.com/api/qotd')
        .then(res1 => {
            res.render('quote.hjs', {
                title: 'QuoteGenerator',
                quote: res1.quote.body,
                author: res1.quote.author
            })
        })
        .catch(err => {
            res.send(err)
        })

});

module.exports = router;