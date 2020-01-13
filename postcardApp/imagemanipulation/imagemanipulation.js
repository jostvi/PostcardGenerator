//Module which takes an image url, a text-string and an optional tag as a parameter
//Image is resized and filtered, text is added and the final image file is uploaded to the cloudinary server
const jimp = require('jimp')
const cloudinary = require('cloudinary').v2;

const imgActive = 'imagemanipulation/active/image.jpg';
const imgExported = 'public/images/image1.jpg';

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
        .catch(err => { console.log(err) })
        .then(tpl => (tpl.clone().write(imgActive)))
        .catch(err => { console.log(err) })
        .then(() => (jimp.read(imgActive)))
        .catch(err => { console.log(err) })
        .then(tpl => (
          jimp.loadFont(checkIf(text))
            .then(font => ([tpl, font]))
            .catch(err => { console.log(err) })
        ))
        .catch(err => { console.log(err) })
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
        .catch(err => { console.log(err) })
        .then(tpl => {
          tpl.quality(100).write(imgExported)
          console.log("Uploading to cloudinary: " + imgExported + ", tags: " + tag)
          cloudinary.uploader.upload(imgExported, { tags: [tag] })
            .then(result => {
              resolve(result.url)
            }, reason => {
              console.log(reason)
              reject(reason)
            })
        })
        .catch(err => { console.log(err) })
    })
  }
}


