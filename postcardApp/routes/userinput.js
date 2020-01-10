var express = require('express');
var router = express.Router();

/* GET about. */
router.get('/', (req, res, next) => {

    res.render('userinput', {
        title: 'Postcard Generator'
    })
});

module.exports = router;
