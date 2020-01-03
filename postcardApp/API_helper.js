const request = require('request');
const manipulator = require('../imagemanipulation/imagemanipulation');

module.exports = {

    standardCall : function(url) {
        return new Promise((resolve, reject) => {
            request(url, { json: true}, (err, res, body) => {
                if (err) reject(err);
                resolve(body); 
            });
        })
    },

    uglyCall : function(image, quote) {
        return new Promise((resolve, reject) => {
            
            var response = manipulator.generate(image, quote);
            resolve(response);
        })
    }
}