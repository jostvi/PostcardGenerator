var express = require('express');
var router = express.Router();

const pd = require('paralleldots');
const helper = require('../API_helper');
const manipulator = require('../imagemanipulation/imagemanipulation');

router.get('/', (req, res) => {
    helper.standardCall('https://favqs.com/api/qotd')
    .then(res1 => { 
        pd.apiKey = 'gSLgAnmknvK9FbxLwV3vIpH9GhSNp74R6CFtvPbLbRw';
        pd.keywords(res1.quote.body)
        .then((response) => {
            console.log(res1.quote.body)
            console.log(response);
            let keyword = JSON.parse(response);
            let sorted = keyword.keywords.sort((a, b) => 
            Number(b.confidence_score) - Number(a.confidence_score));
            return sorted[0].keyword;
        })
        .catch((error) => {console.log(error)
    })
        .then(res2 => { 
            
            var url = 'https://pixabay.com/api/?key=14668696-1050eb2ce23d8700022954b86' +
            '&q=' + res2.split(" ")[0] + '&image_type=photo&orientation=horizontal';
            console.log(res2);

            helper.standardCall(url)
            .then(res3 => {
                console.log(res3.hits[0])
                manipulator.generate(res3.hits[0].largeImageURL, res1.quote.body)
              //  helper.uglyCall(res3.hits[0].largeImageURL, res1.quote.body)
              // .then(bajs => {
              //     console.log(bajs);
                    res.render('response.hjs', {
                        title: 'QuoteGenerator',
                        quote: res1.quote.body,
                        author: res1.quote.author
                        })
                // })
            })      
            .catch(err => { res.send(err); })
    })
        .catch(err => { res.send(err); })
    })
    .catch(err => { res.send(err); })
  
  });

  module.exports = router;