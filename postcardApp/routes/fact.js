var express = require('express');
var router = express.Router();
const helper = require('../API_helper');

/* Render fact page */
router.get('/', (req, res) => {

    helper.standardCall('https://uselessfacts.jsph.pl//random.json?language=en')
        .then(result => {
            result.text = result.text.replace(/`/g, "'")
            res.render('fact', {
                title: 'FactGenerator',
                fact: result.text,
            })
        })
        .catch(err => {
            console.log(err)
            res.send(err)
        })
});

module.exports = router;