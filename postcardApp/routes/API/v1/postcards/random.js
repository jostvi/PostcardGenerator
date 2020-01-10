var express = require('express');
var router = express.Router();
const imageGallery = require('../../../../getimages/getImages.js')

router.get('/', (req, res, next) => {
    var tag = req.query.tag;
    console.log(tag)
    if (tag === 'quote') {
      console.log('Retrieving quotes')
      imageGallery.getQuoteImages()
      .then((result) => {
        return new Promise ((resolve, reject) => {

            let postcard = result.resources[Math.floor(Math.random() * result.resources.length)].url;
            resolve({ 'urlList' : [{'url' : postcard}]})
        })        
    })
      .catch((error) => {
        console.log(error)
      })
      .then(postcard => {
        //console.log(images);
        res.send(postcard)
      })
      
    } else if (tag === 'fact') {
      imageGallery.getFactImages().then((result) => {
        return new Promise ((resolve, reject) => {

            let postcard = result.resources[Math.floor(Math.random() * result.resources.length)].url;
            resolve({ 'urlList' : [{'url' : postcard}]})
        })        
    })
      .catch((error) => {
        console.log(error)
      })
      .then(postcard => {
        //console.log(images);
        res.send(postcard)
      })
    }
    else
    imageGallery.getImages()
    .then((result) => {
        return new Promise ((resolve, reject) => {

            let postcard = result.resources[Math.floor(Math.random() * result.resources.length)].url;
            resolve({ 'urlList' : [{'url' : postcard}]})
        })        
    })
      .catch((error) => {
        console.log(error)
      })
      .then(postcard => {
        //console.log(images);
        res.send(postcard)
      })
    });

module.exports = router;




module.exports = router;