const request = require('request');

/* Helper class that handles request calls and returns a Promise */
module.exports = {

    standardCall : function(url) {
        return new Promise((resolve, reject) => {
                request(url, { json: true}, (err, res, body) => {
                    if (err) reject(err);
                    resolve(body); 
                });
        })
    }
}