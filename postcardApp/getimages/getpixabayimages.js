const helper = require('../API_helper');
const pixaKeyJ = '14668696-1050eb2ce23d8700022954b86'
const pixaKeyC = '14668696-1050eb2ce23d8700022954b86'


function getImagesByKeyword(keyword) {
    console.log("inne...")
    console.log("Keyword:" + keyword)

    var url = 'https://pixabay.com/api/?key=' + pixaKeyJ + '&q=' + keyword + '&image_type=photo&orientation=horizontal'
    return new Promise((resolve, reject) => {
        helper.standardCall(url)
            .then(response => {
                var images = { urlList: [] }
                for (i = 0; i < 8; i++) {
                    console.log(response.hits[i].largeImageURL)         // Måste felhanteras! 
                    images.urlList.push({ url: response.hits[i].largeImageURL })    // Måste felhanteras!
                }
                console.log("returning")
                resolve(images)
            })
            .catch(err => {
                reject(err)
            })
    })
};

module.exports.getImagesByKeyword = getImagesByKeyword

