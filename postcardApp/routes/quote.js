var express = require('express');
var router = express.Router();

const pd = require('paralleldots');
const helper = require('../API_helper');
const manipulator = require('../imagemanipulation/imagemanipulation');
const pixaKey = '14668696-1050eb2ce23d8700022954b86';

router.get('/', (req, res) => {
    helper.standardCall('https://favqs.com/api/qotd')
    .then(res1 => {
        pd.apiKey = 'gSLgAnmknvK9FbxLwV3vIpH9GhSNp74R6CFtvPbLbRw';
        pd.keywords(res1.quote.body)
        .then((response) => {
            // console.log(res1.quote.body)
            // console.log(response);
            let keyword = JSON.parse(response);
            let sorted = keyword.keywords.sort((a, b) => 
            Number(b.confidence_score) - Number(a.confidence_score));
            return sorted[0].keyword;
        })
        .catch((error) => {console.log(error)
    })
        .then(res2 => { 
            
            var url = 'https://pixabay.com/api/?key=' + pixaKey + '&q=' + 
            res2.split(" ")[0] + '&image_type=photo&orientation=horizontal';
            // console.log(res2);

            helper.standardCall(url)
            .then(res3 => {
                var roof = 9;
                console.log(res3.totalHits);
                if(res3.totalHits < roof)
                    roof = res3totalHits + 1;
                manipulator.generate(res3.hits[Math.floor(Math.random() * roof)].largeImageURL, res1.quote.body, "quote")
                .then(result => {
                //   console.log('Quote:' + result);
                    // res.render('response.hjs', {
                    //     title: 'QuoteGenerator',
                    //     quote: res1.quote.body,
                    //     author: res1.quote.author,
                    //     url: result
                    //     })
                    res.header("Access-Control-Allow-Origin", "*");
                    res.send('hajdå')
                 })
            })      
            .catch(err => { res.send(err); })
    })
        .catch(err => { res.send(err); })
    })
    .catch(err => { res.send(err); })
  
  });

  module.exports = router;