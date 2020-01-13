var express = require('express');
var router = express.Router();

/* Render about page */
router.get('/', (req, res, next) => {

        res.render('about', {
          title: 'Postcard Generator'
      })
      .catch(err => {
        res.render(err)
    })
    });

module.exports = router;
