//API Route that takes text as a required parameter and image url and tag as optional ones
//If no image url is provided the text string is analyzed using the wordpos API and an image url is fetched from the pixabay API
//Image-url, text (and an optional tag) are sent to the imagemanipulation module, where the postcard is generated and uploaded to the cloud
//Returns a JSON-object containing the url to the postcard that was created

var express = require('express');
var router = express.Router();
var WordPOS = require('wordpos');
const pixabay = require('../../../../getImages/getpixabayimages.js');
const manipulator = require('../../../../imagemanipulation/imagemanipulation');


router.post('/', (req, res) => {
    if (req.body.text === undefined) {
        res.send(404, "Text is a required parameter for this route!")
    }

    console.log(req.body.url)
    if (req.body.url === undefined) {
        text = req.body.text;
        console.log(text);

        wordpos = new WordPOS();
        wordpos.getNouns(text, (keys) => {
            key = keys[Math.floor(Math.random() * keys.length)]
            console.log(key)
            pixabay.getImagesByKeyword(key)
                .then(result => {
                    console.log(result)
                    url = result.urlList[0].url

                    return url
                }).then(url => {
                    manipulator.generate(url, req.body.text, "user generated")

                        .then(url => {

                            res.send({
                                url
                            })
                        })
                        .catch(err => { res.send(404) })
                })
        })
    }
    else {
        console.log(req.body.url)
        console.log(req.body.text)
        console.log(req.body.tag)
        manipulator.generate(req.body.url, req.body.text, req.body.tag)
            .then(result => {
                res.send({
                    url: result
                })
            })
            .catch(err => {
                res.send('error')
            })
    }
})

module.exports = router;