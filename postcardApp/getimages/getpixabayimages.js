const helper = require('../API_helper');

//route för imagesByKeyword??? som anropas från klienten;  for loop och sen lägga allt i en och samma array, men hur skickar vi med keywords???
// var kwAarray = ['test', 'flower', 'people']

async function createImageArray(url, res) {
    
    try {
        return await helper.standardCall(url)
        
    } catch (err) {
        console.log(err)
        return res.status(500).send()
    }
}


async function getImagesByKeyword(keywords, res) {
    var length = keywords.length;
    let response
    let images = { urlList: [] } 
    
    console.log("inne...")
    console.log(keywords)
    console.log(length);

    for (i = 0; i < length; i++) {
         var key = keywords[i].keyword.split(" ")[0];
         var url = 'https://pixabay.com/api/?key=14668696-1050eb2ce23d8700022954b86' +
             '&q=' + key + '&image_type=photo&orientation=horizontal'
         console.log(url)
        try {
            response = await helper.standardCall(url)
       
       
            for (i = 0; i < 8; i++) {           
                console.log(response.hits[i].largeImageURL)         // Måste felhanteras! 
                images.urlList.push({url : response.hits[i].largeImageURL})    // Måste felhanteras!
            }
             } catch (err) {
            console.log(err)
            return res.status(500).send()
        }
        // console.log(images)


<<<<<<< HEAD
    }
    console.log("returning")
    return images
};

// getImagesByKeyword("test")
=======

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

>>>>>>> 322963f8b593d9b8b12c1ebe8696df43df02affb
module.exports.getImagesByKeyword = getImagesByKeyword

