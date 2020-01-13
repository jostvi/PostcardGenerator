var express = require('express');
var router = express.Router();

/* Render userinput page */
router.get('/', function(req, res){

    res.render('userinput', {
        title: 'Postcard Generator'
    })
});

module.exports = router;



