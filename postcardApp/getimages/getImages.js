const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: 'dqhlic2nx', 
    api_key: '922488389614978', 
    api_secret: 'V3uoIVVMor9OcTrsxwikdc5VkX4' 
  });

//OBS! bör kanske döpas om till getPostcards så att det inte blandas ihop med själva bildhanteringen
//Bearbeta returen redan här så att varje funktion returnera ett json objekt?
//OBS! begränsa antalet resultat? ha nåt default värde kanske?
function getImages() {
    return new Promise ((resolve, reject) => {
      cloudinary.api.resources( { max_results: 500 },
        function(error, result) {console.log(error)
        if (error) {reject('Error')}
        else 
        resolve(result)
      })
    })};

function getCarouselImages() {
  return new Promise ((resolve, reject) => {
    cloudinary.api.resources( { max_results: 8 },
      function(error, result) {console.log(error)
      if (error) {reject('Error')}
      else 
      resolve(result)
    })
  })};

//slå ihop funktionerna till en och skicka in variabel istället, hantera med if sats?  
function getQuoteImages() {
  return new Promise ((resolve, reject) => {
    cloudinary.api.resources_by_tag('quote', { max_results: 500 },
      function(error, result) {console.log(error)
      if (error) {reject('Error')}
      else 
      resolve(result)
    })
  })};

  function getFactImages() {
    return new Promise ((resolve, reject) => {
      cloudinary.api.resources_by_tag('fact', { max_results: 500 },
        function(error, result) {console.log(error)
        if (error) {reject('Error')}
        else 
        resolve(result)
      })
    })};
    //test
    //getImages()
    //.then(res => console.log(res.resources[Math.floor(Math.random() * res.resources.length)].url))
  
  
  module.exports.getImages = getImages
  module.exports.getQuoteImages = getQuoteImages
  module.exports.getFactImages = getFactImages
  module.exports.getCarouselImages = getCarouselImages

  