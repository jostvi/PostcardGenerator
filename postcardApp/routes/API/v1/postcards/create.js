var express = require('express');
var router = express.Router();
var WordPOS = require('wordpos');
const pixabay = require('../../../../getImages/getpixabayimages.js');
const manipulator = require('../../../../imagemanipulation/imagemanipulation');

//Kolla upp hur själva responsen ska se ut, error codes, eventuell header
//https://stackoverflow.com/questions/7676264/how-can-i-send-back-response-headers-with-node-js-express (i headern kan man ev. styra att det öppnas en download dialog???)
// OBS! Om anropet innehåller bara text måste vi först anropa pixabay, kan vi hantera det med en ifsats?


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
        key = keys[Math.floor(Math.random()*keys.length)]
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
     //lägg till felhantering i manipulator om det är ett felaktigt url, just nu skickas ingen felkod
    manipulator.generate(req.body.url, req.body.text, req.body.tag)
    .then(result => {
        res.send({
            url: result
        })
    })
    .catch(err => { res.send(404) })

    }

})

module.exports = router;