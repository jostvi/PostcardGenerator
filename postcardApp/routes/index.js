var express = require('express');
var router = express.Router();
const imageGallery = require('../getimages/getImages.js')
//döp om till getPostcards.js

/* GET home page. */
router.get('/', (req, res, next) => {
    
  imageGallery.getCarouselImages()
  .then((result) => {
      return new Promise ((resolve, reject) => {
        //OBS! bör kanske flyttas till getImages.js, lägg till möjligheten att begränsa antalet returnerade bilder
          let images = { urlList : [] }
          result.resources.forEach(function(item) {
              images.urlList.push({url: item.url})
          
          })
          resolve(images)
      })        
     
    })
    .catch((error) => {
      console.log(error)
    })
    .then(images => {
        //console.log(images);
        res.render('index', {
          title: 'Postcard Generator', images
      })
    })
    });


module.exports = router;
