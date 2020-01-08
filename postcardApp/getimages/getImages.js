const cloudinary = require('cloudinary').v2;
const urlList = []
cloudinary.config({ 
    cloud_name: 'dqhlic2nx', 
    api_key: '922488389614978', 
    api_secret: 'V3uoIVVMor9OcTrsxwikdc5VkX4' 
  });


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
  
  /* getImages()
  .then((result) => {
    result.resources.forEach(function(item) {
      urlList.push(item.url)
      //console.log(item.url)
    })
    console.log(urlList)
  })
  .catch((error) => {
    console.log(error)
  }); */
  
  module.exports.getImages = getImages
  module.exports.getQuoteImages = getQuoteImages
  module.exports.getFactImages = getFactImages
  module.exports.getCarouselImages = getCarouselImages

  