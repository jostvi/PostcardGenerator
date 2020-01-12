var express = require('express');
var router = express.Router();
var WordPOS = require('wordpos');
const pixabay = require('../../getImages/getpixabayimages.js');

router.get('/', (req, res) => {
    text = req.query.text
    count = req.query.keyCount
    console.log("key: " + count)
    wordpos = new WordPOS();
    wordpos.getNouns(text, (keys) => { 
        key = keys[count] 
        console.log(key)
        pixabay.getImagesByKeyword(key)
        .then(result => {
            res.send({
                urlList: result.urlList,
                keys: keys.length
            })
        })
        .catch(err => { res.send(err) })
    })
});

module.exports = router;