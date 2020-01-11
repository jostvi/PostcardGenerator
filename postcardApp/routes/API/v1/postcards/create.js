var express = require('express');
var router = express.Router();
const manipulator = require('../../../../imagemanipulation/imagemanipulation');

//Kolla upp hur själva responsen ska se ut, error codes, eventuell header
//https://stackoverflow.com/questions/7676264/how-can-i-send-back-response-headers-with-node-js-express (i headern kan man ev. styra att det öppnas en download dialog???)

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