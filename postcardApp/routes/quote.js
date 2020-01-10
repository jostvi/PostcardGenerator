var express = require('express');
var router = express.Router();

const pd = require('paralleldots');
const helper = require('../API_helper');
const manipulator = require('../imagemanipulation/imagemanipulation');
const pixaKey = '14668696-1050eb2ce23d8700022954b86';
const pixabay = require('../getImages/getpixabayimages.js');

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