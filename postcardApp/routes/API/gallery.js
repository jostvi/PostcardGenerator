var express = require('express');
var router = express.Router();
const imageGallery = require('../../getimages/getImages.js')


/* GET home page. */
router.get('/', (req, res, next) => {

    imageGallery.getImages()
    .then((result) => {
        return new Promise ((resolve, reject) => {
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
        console.log(images);
        res.send(images)
      })
    });

module.exports = router;