const helper = require('../API_helper');

//route för imagesByKeyword??? som anropas från klienten;  for loop och sen lägga allt i en och samma array, men hur skickar vi med keywords???
var kwAarray = ['test', 'flower', 'people']

function createImageArray(kwArray) {
    //detta får du fixa, Johan :-)
        var completeImageArray = [];
        
    }



function getImagesByKeyword(keyword) {
        var url = 'https://pixabay.com/api/?key=14668696-1050eb2ce23d8700022954b86' +
        '&q=' + keyword + '&image_type=photo&orientation=horizontal'
        helper.standardCall(url)
        .then((result) => {
            return new Promise ((resolve, reject) => {
                var imageArray = [result.hits[0].largeImageURL, result.hits[1].largeImageURL, result.hits[2].largeImageURL]
                console.log(imageArray)
                resolve(imageArray)
            })
        .catch((error) => {console.log(error)
        })
    })};

module.exports.getImagesByKeyword = getImagesByKeyword

