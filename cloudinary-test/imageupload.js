const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: 'dqhlic2nx', 
    api_key: '922488389614978', 
    api_secret: 'V3uoIVVMor9OcTrsxwikdc5VkX4' 
  });


cloudinary.uploader.upload("test.jpg", function(error, result) { 
    //url som returneras kan användas för att komma åt bilden
    console.log(result.url)
    if (error) {
        console.log(error)
    } });