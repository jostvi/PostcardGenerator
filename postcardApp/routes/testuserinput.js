var express = require('express');
var router = express.Router();

/* GET about. */
router.get('/', (req, res, next) => {

    res.render('testuserinput', {
        title: 'Postcard Generator'
    })
});
router.get('/', function (req, res, next) {
    res.render('testuserinput', {output: req.params});
});

module.exports = router;