var express = require('express');
var router = express.Router();

/* GET userinput. */
router.get('/', function(req, res){

    res.render('userinput', {
        title: 'Postcard Generator'
    })
});

module.exports = router;



