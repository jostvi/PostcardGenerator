var express = require('express');
var router = express.Router();
const imageGallery = require('../getimages/getImages.js')
//döp om till getPostcards.js

/* Render home page */
router.get('/', (req, res, next) => {

  imageGallery.getCarouselImages()
    .then((result) => {
      return new Promise((resolve, reject) => {
        //OBS! bör kanske flyttas till getImages.js, lägg till möjligheten att begränsa antalet returnerade bilder
        let images = { urlList: [] }
        result.resources.forEach(function (item) {
          images.urlList.push({ url: item.url })

        })
        resolve(images)
      })

    })
    .catch((error) => {
      console.log(error)
    })
    .then(images => {
      res.render('index', {
        title: 'Postcard Generator',
        images
      })
    })
    .catch(err => {
      console.log(err)
      res.send(err)
    })
});


module.exports = router;
