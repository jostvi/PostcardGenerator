var express = require('express');
var router = express.Router();
const manipulator = require('../imagemanipulation/imagemanipulation');

router.post('/', (req, res) => {
    console.log(req.body)
    console.log(req)
    console.log(req.body.url)
    manipulator.generate(req.body.url, req.body.text, req.body.tag)
    .then(result => {
        res.send({
            url: result
        })
    })
    .catch(err => { res.send('error') })
}) 

module.exports = router;