var express = require('express');
var router = express.Router();

/* Render about page */
router.get('/', (req, res) => {
  
  res.render('about', {
    title: 'About us'
  })
});

module.exports = router;
