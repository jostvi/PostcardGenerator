const helper = require('../API_helper');
const pixaKeyJ = '14668696-1050eb2ce23d8700022954b86'
const pixaKeyC = '14668696-1050eb2ce23d8700022954b86'

/* A function that takes a keyword as a parameter and makes a GET-request to the pixabay API. 
The function returns a Promise wich is resolved if the 'images'-object gets sucessfully populated */
function getImagesByKeyword(keyword) {
    console.log("Keyword:" + keyword)
    var url = 'https://pixabay.com/api/?key=' + pixaKeyJ + '&q=' + keyword + '&image_type=photo&orientation=horizontal'
    
    return new Promise((resolve, reject) => {
        helper.standardCall(url)
            .then(response => {
                var images = { urlList: [] }
                for (i = 0; i < 8; i++) {
                    console.log(response.hits[i].largeImageURL)
                    images.urlList.push({ url: response.hits[i].largeImageURL })
                }
                resolve(images)
            })
            .catch(err => {
                reject(err)
            })
    })
};

module.exports.getImagesByKeyword = getImagesByKeyword

