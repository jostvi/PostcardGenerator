var express = require('express');
var router = express.Router();
var WordPOS = require('wordpos');
const pixabay = require('../../getImages/getpixabayimages.js');

/* Internal route used by our client to receive images based on a text string. The call to .getNouns(text)
returns keywords used in the .getImagesByKeyword(key) function. This function blocks until a promise 
is resolved or rejected in .getImagesByKeyword(key). On resolve, a JSON-object with image-URLs and the
number of keys found are sent in response to the client. */
router.get('/', (req, res) => {
    text = req.query.text
    count = req.query.keyCount
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
        .catch(err => { res.send('error') })
    })
});

module.exports = router;