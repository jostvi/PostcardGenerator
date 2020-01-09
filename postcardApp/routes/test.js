
//hämta quote
//hämta keywordlista
//hämta bilder och lägg alla url i en array (OBS! senare: hämta två bilder för varje keyword?)

var express = require('express');
var router = express.Router();
var WordPOS = require('wordpos');
const helper = require('../API_helper');


router.get('/', (req, res) => {
    helper.standardCall('https://favqs.com/api/qotd')
    .then(quote => { 
        console.log(quote.quote.body)
        wordpos = new WordPOS();
        wordpos.getNouns(JSON.stringify(quote.quote.body), function(result){
        console.log(result);
        })
    .catch((error) => {console.log(error)
        
    })
    .then((keywordArray) => {
        return new Promise ((resolve, reject) => {
            var keyword = keywordArray[Math.floor(Math.random() * keywordArray.length)];
            console.log(keyword)
            resolve(keyword)
        })
    })
        
    .catch((error) => {console.log(error)
    })
    .then(keyword => { 
        var url = 'https://pixabay.com/api/?key=14668696-1050eb2ce23d8700022954b86' +
        '&q=' + keyword + '&image_type=photo&orientation=horizontal';
        console.log(url)
        console.log(keyword);
        helper.standardCall(url)
        .then(pixabayres => {
            return new Promise ((resolve, reject) => {
                let images = { "img1" : {"url": pixabayres.hits[0].largeImageURL }, "img2" : {"url": pixabayres.hits[1].largeImageURL }, "img3": {"url": pixabayres.hits[2].largeImageURL }};
                resolve(images)
            })
        })
   
        .catch((error) => {console.log(error)
        })
        .then(images => {
            console.log(images)
            //console.log(images.urlList[0].url1)
             res.render('test.hjs', {
                 title: 'Testsida',
                 quote: quote.quote.body,
                 keyword: keyword,
                 images: images
                })
        })
    })
})
    });
   
module.exports = router;

