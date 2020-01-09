var express = require('express');
var router = express.Router();
const imageGallery = require('../../getimages/getImages.js')

//returnerar ett json-objekt (eller är det en sträng?) som innehåller en lista med url:er till alla vykort med taggen "fact"
//OBS! döp om routen till fact_postcards och ändra koden
router.get('/', (req, res, next) => {

    imageGallery.getFactImages()
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