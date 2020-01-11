var express = require('express');
var router = express.Router();

/* GET userinput. */
router.get('/', function(req, res, next){

    res.render('userinput', {
        title: 'Postcard Generator'
    })
});

router.get('/userinput/:sample-text', function (req, res, next) {
    res.render('testuserinput', {output: req.params.sample-text});
});

module.exports = router;



