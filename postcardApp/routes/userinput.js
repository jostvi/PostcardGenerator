var express = require('express');
var router = express.Router();

/* GET userinput. */
router.get('/', function(req, res, next){

    res.render('userinput', {
        title: 'Postcard Generator'
    })
});

module.exports = router;



