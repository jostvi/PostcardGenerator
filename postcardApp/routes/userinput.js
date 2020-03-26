var express = require('express');
var router = express.Router();

/* Render userinput page */
router.get('/', (req, res) => {

    res.render('userinput', {
        title: 'CustomGenerator'
    })
});

module.exports = router;



