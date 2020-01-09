var express = require('express');
var router = express.Router();
var WordPOS = require('wordpos');
//const pd = require('paralleldots');
const helper = require('../API_helper');
const manipulator = require('../imagemanipulation/imagemanipulation');

router.get('/', (req, res) => {
    helper.standardCall('https://uselessfacts.jsph.pl//random.json?language=en')
    .then(res1 => { 
        console.log(res1.text)
        wordpos = new WordPOS();
        wordpos.getNouns(JSON.stringify(res1.text), function(result){
            console.log(result);
    })
    .catch((error) => {console.log(error)
    })
    .then((response) => {
        return new Promise ((resolve, reject) => {
            var keyword = response[Math.floor(Math.random() * response.length)];
            console.log(keyword)
            resolve(keyword)
        })
    })
        /* console.log(res1);
        pd.apiKey = 'gSLgAnmknvK9FbxLwV3vIpH9GhSNp74R6CFtvPbLbRw';
        pd.keywords(res1.text)
        .then((response) => {
            console.log(res1.text)
            console.log(response);
            let keyword = JSON.parse(response);
            let sorted = keyword.keywords.sort((a, b) => 
            Number(b.confidence_score) - Number(a.confidence_score));
            return sorted[0].keyword; */
       
    .catch((error) => {console.log(error)
    })
        .then(res2 => { 
            var url = 'https://pixabay.com/api/?key=14668696-1050eb2ce23d8700022954b86' +
            '&q=' + res2 + '&image_type=photo&orientation=horizontal';
            // console.log(url)
            // console.log(res2);
          /*   var url = 'https://pixabay.com/api/?key=14668696-1050eb2ce23d8700022954b86' +
            '&q=' + res2.split(" ")[0] + '&image_type=photo&orientation=horizontal';
            console.log(res2); */

            helper.standardCall(url)
            .then(res3 => {
                var roof = 9;
                // console.log(res3.hits[0])
                if(res3.totalHits < roof)
                roof = res3totalHits + 1;
                manipulator.generate(res3.hits[Math.floor(Math.random() * roof)].largeImageURL, res1.text, "fact")
                .then(result => {
                   //console.log('Fact:' + result);
                    // res.render('fact.hjs', {
                    //     title: 'FactGenerator',
                    //     fact: res1.text,
                    //     url: result
                    //     })
                    res.send({
                        url: result
                    })
                 })
            })      
            .catch(err => { res.send(err); })
    })
        .catch(err => { res.send(err); })
    })
    .catch(err => { res.send(err); })
  
  });

  module.exports = router;