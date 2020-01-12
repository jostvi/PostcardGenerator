//Takes optional quote- and fact- query parameters
//Returns a JSON-object containing a random image url
//Refactoring needed if time allows

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
        return new Promise((resolve, reject) => {

          let postcard = result.resources[Math.floor(Math.random() * result.resources.length)].url;
          resolve({ 'urlList': [{ 'url': postcard }] })
        })
      })
      .catch((error) => {
        res.send(404)
      })
      .then(postcard => {
        //console.log(images);
        res.send(postcard)
      })

  } else if (tag === 'fact') {
    imageGallery.getFactImages().then((result) => {
      return new Promise((resolve, reject) => {

        let postcard = result.resources[Math.floor(Math.random() * result.resources.length)].url;
        resolve({ 'urlList': [{ 'url': postcard }] })
      })
    })
      .catch((error) => {
        console.log(error)
      })
      .then(postcard => {
        //console.log(images);
        res.send(404)
      })
  }
  else
    imageGallery.getImages()
      .then((result) => {
        return new Promise((resolve, reject) => {

          let postcard = result.resources[Math.floor(Math.random() * result.resources.length)].url;
          resolve({ 'urlList': [{ 'url': postcard }] })
        })
      })
      .catch((error) => {
        res.send(404)
      })
      .then(postcard => {
        //console.log(images);
        res.send(postcard)
      })
});

module.exports = router;