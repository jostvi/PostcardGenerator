const express = require('express');
const request = require('request');
const helper = require('./API_helper');
const pd = require('paralleldots');
const manipulator = require('./imagemanipulation/imagemanipulation');
const app = express();

const port = process.env.PORT || 3000;

app.set('view engine', 'hjs');

app.use((req, res, next) => {
    console.info(`Got request on ${req.path} (${req.method}).`);
    next();
});

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/about', (req, res) => {
    res.send('About Something');
});

app.listen(port, () => {
    console.info(`Server is listening on port ${port}.`);
    console.info('Available routes are:');
    app._router.stack.forEach((r) => {
        if (r.route && r.route.path) console.info(r.route.path);
    });
});

app.get('/quote', (req, res) => {
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
                console.log(url);
                helper.standardCall(url)
        
                .then(res3 => {
                    var img = manipulator.generate(res3.hits[0].largeImageURL, res1.quote.body);
                    console.log(img);
                    //console.log(res3);
                    res.render('response.hjs', {
                    title: 'QuoteGenerator',
                    quote: res1.quote.body,
                    author: res1.quote.author
                 //   image:  img // res3.hits[0].largeImageURL
                    })
                
                })
                .catch(err => { res.send(err); })
        })
            .catch(err => { res.send(err); })
        })
        .catch(err => { res.send(err); })
      
})

app.get('/pic', )


