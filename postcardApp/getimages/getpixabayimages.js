const helper = require('../API_helper');

//route för imagesByKeyword??? som anropas från klienten;  for loop och sen lägga allt i en och samma array, men hur skickar vi med keywords???
// var kwAarray = ['test', 'flower', 'people']

async function getImagesByKeyword(keywords, res) {
    var length = keywords.length;
    let response
    let images = { urlList: [] }

    console.log("inne...")
    console.log(keywords)
    console.log(length);

    var url = 'https://pixabay.com/api/?key=14668696-1050eb2ce23d8700022954b86' +
        '&q=' + keywords[0] + '&image_type=photo&orientation=horizontal'
    console.log(url)
    try {
        response = await helper.standardCall(url)


        for (i = 0; i < 8; i++) {
            console.log(response.hits[i].largeImageURL)         // Måste felhanteras! 
            images.urlList.push({ url: response.hits[i].largeImageURL })    // Måste felhanteras!
        }
    } catch (err) {
        console.log(err)
        return res.status(500).send()
    }
    // console.log(images)
    console.log("returning")
    return images
};

// getImagesByKeyword("test")
module.exports.getImagesByKeyword = getImagesByKeyword

