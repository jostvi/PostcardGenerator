var express = require('express');
var router = express.Router();
const manipulator = require('../../../../imagemanipulation/imagemanipulation');

//var postcardBuilder = require('../../../../imagemanipulation/postcardBuilder.js')

//ny postcard builder!

router.post('/', (req, res) => {
    manipulator.generate(req.body.url, req.body.quote, "quote")
    .then(result => {
        res.send({
            url: result
        })
    })
    .catch(err => { res.send(err) })
}) 

module.exports = router;

module.exports = router;