// const ul = require('../../cloudinary-test/imageupload')
const jimp = require('jimp')
const cloudinary = require('cloudinary').v2;

let imgActive = 'imagemanipulation/active/image.jpg';
let imgExported = 'public/images/image1.jpg';



cloudinary.config({
  cloud_name: 'dqhlic2nx',
  api_key: '922488389614978',
  api_secret: 'V3uoIVVMor9OcTrsxwikdc5VkX4'
});
    
module.exports = {

  generate : function(image, quote, tag) {
    return new Promise((resolve, reject) => {
      jimp.read(image)
    
      .then(tpl => {
          tpl 
              .resize(1024, 768)
              .quality(60)
              .greyscale()
              .brightness(0.3)
        
              return tpl
      })
  
      .then(tpl => (tpl.clone().write(imgActive)))
  
      .then(() => (jimp.read(imgActive)))
  
      .then(tpl => (
          jimp.loadFont(jimp.FONT_SANS_64_WHITE)
          .then(font => ([tpl, font]))
      ))
  
      .then(data => {
  
          tpl = data[0];
          font = data[1];
          let textData = {
            text: quote,
            maxWidth: 800,
            maxHeight: 500,
            placementX: 100,
            placementY: 150
          }

          return tpl.print(font, textData.placementX, textData.placementY, {
            text: textData.text,
            alignmentX: jimp.HORIZONTAL_ALIGN_CENTER,
            alignmentY: jimp.VERTICAL_ALIGN_MIDDLE
          }, textData.maxWidth, textData.maxHeight);
        })
  
        .then(tpl => {
          tpl.quality(100).write(imgExported)
            cloudinary.uploader.upload(imgExported, {tags: [tag]}, function (error, result) {
            //url som returneras kan användas för att komma åt bilden
            resolve(result.url)
            if (error) {
              console.log(error)
            }
          })
        })
      .catch(err => {
        console.error(err);
      });
  
    })
  }  
}


