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
 
function checkIf(text) {
  console.log("Quote.length: " + text.length)
  if(text.length < 200) 
    font = 'imagemanipulation/futura_64_grey.fnt'
  else
    font = jimp.FONT_SANS_32_BLACK
  console.log("Font: " + font)
  return font
}

module.exports = {

  generate : function(url, text, tag) {
    return new Promise((resolve, reject) => {
      console.log("before read")
      console.log(url)
      jimp.read(url)
      
      /* .then(tpl => { console.log("image read")
          tpl 
              .resize(1024, 768)
              .quality(60)
              .greyscale()
              .brightness(0.3)
        
              return tpl
      }) */
      
    .then(tpl => {
        tpl 
            .resize(1024, 768)
            .quality(60)
            .brightness(0.6)
      
            return tpl
    })
  
      .then(tpl => (tpl.clone().write(imgActive)))
  
      .then(() => (jimp.read(imgActive)))
  
      .then(tpl => (
          jimp.loadFont(checkIf(text))
          .then(font => ([tpl, font]))
      ))
  
      .then(data => {
  
          tpl = data[0];
          font = data[1];
          let textData = {
            text: text,
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


