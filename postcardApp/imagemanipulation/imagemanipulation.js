//Module which takes an image url, a text-string and an optional tag as a parameter
//Image is resized and filtered, text is added and the final image file is uploaded to the cloudinary server
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
  if (text.length < 200)
    font = 'imagemanipulation/fonts/futura_64_darkgrey.fnt'
  else
    font = 'imagemanipulation/fonts/futura_48_darkgrey.fnt'
  console.log("Font: " + font)
  return font
}

module.exports = {

  generate: function (url, text, tag) {
    return new Promise((resolve, reject) => {
      console.log("before read")
      console.log(url)
      jimp.read(url)

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
          cloudinary.uploader.upload(imgExported, { tags: [tag] }, function (error, result) {
            resolve(result.url)
            if (error) {
              console.log(error)
            }
          })
        })
<<<<<<< HEAD
      .catch(err => {
        reject(err);
      });
=======
        .catch(err => {
          reject(err);
        });

>>>>>>> c6b2ada82521402dd0f58fb4d2c71e0f697de513
    })
  }
}


