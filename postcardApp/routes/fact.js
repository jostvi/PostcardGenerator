var express = require('express');
var router = express.Router();
const helper = require('../API_helper');

router.get('/', (req, res) => {

    helper.standardCall('https://uselessfacts.jsph.pl//random.json?language=en')
        .then(result => {
            res.render('fact.hjs', {
                title: 'FactGenerator',
                fact: result.text,
            })
        })
        .catch(err => {
            res.send(err)
        })

});

module.exports = router;