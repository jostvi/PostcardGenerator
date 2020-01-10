var express = require('express');
var router = express.Router();
var WordPOS = require('wordpos');
// const pd = require('paralleldots');
const pixabay = require('../../getImages/getpixabayimages.js');

router.get('/', (req, res) => {
    quote = req.query.quote
    count = req.query.keyCount
    console.log("keys: " + count)
    wordpos = new WordPOS();
    wordpos.getNouns(quote, (keys) => {
        key = keys[count]
        pixabay.getImagesByKeyword(key, res)
        .then((result) => {
            console.log("ute igen...")
            // console.log(result)

            res.send({
                urlList: result.urlList,
                keys: keys.length
            }
            )
        })
        .catch(err => { res.send(err) })
    })
    // helper.standardCall('https://favqs.com/api/qotd')
    //     .then(res1 => {
            // pd.apiKey = 'gSLgAnmknvK9FbxLwV3vIpH9GhSNp74R6CFtvPbLbRw';
            // pd.keywords(quote)
            //     .then((res) => {
            //         // console.log(res1.quote.body)
            //         // console.log(res);
            //         let keyword = JSON.parse(res);
            //         let sorted = keyword.keywords.sort((a, b) =>
            //             Number(b.confidence_score) - Number(a.confidence_score));

            //         return sorted;
            //     })
            //     .catch((error) => {
            //         console.log(error)
            //     })
            //     .then(sorted => {
            //         console.log(sorted)
                   
               // })
                
        // })
        // .catch(err => { res.send(err) })

});

module.exports = router;