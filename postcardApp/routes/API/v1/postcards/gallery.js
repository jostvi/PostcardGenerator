//Takes optional quote- and fact- query parameters
//Returns a JSON-object containing an array of image urls
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
          let images = { urlList: [] }
          result.resources.forEach(function (item) {
            images.urlList.push({ url: item.url })

          })
          resolve(images)
        })

      })
      .catch((error) => {
        res.send(404)
      })
      .then(images => {
        //console.log(images);
        res.send(images)
      })

  } else if (tag === 'fact') {
    imageGallery.getFactImages().then((result) => {
      return new Promise((resolve, reject) => {
        let images = { urlList: [] }
        result.resources.forEach(function (item) {
          images.urlList.push({ url: item.url })

        })
        resolve(images)
      })

    })
      .catch((error) => {
        res.send(404)
      })
      .then(images => {
        res.send(images)
      })
  }
  else
    imageGallery.getImages()
      .then((result) => {
        return new Promise((resolve, reject) => {
          let images = { urlList: [] }
          result.resources.forEach(function (item) {
            images.urlList.push({ url: item.url })

          })
          resolve(images)
        })

      })
      .catch((error) => {
        res.send(404)
      })
      .then(images => {
        res.send(images)
      })
});

module.exports = router;


