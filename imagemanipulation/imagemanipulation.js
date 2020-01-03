
const jimp = require('jimp')

let imgRaw = 'imagemanipulation/raw/colmar_3.jpg';
let imgLogo = 'imagemanipulation/raw/stamp.png';

let imgActive = 'imagemanipulation/active/image.jpg';
let imgExported = 'imagemanipulation/export/image1.jpg';


module.exports = {
  generate : function(image, quote){
    console.log('Manipulator: ' + image + '\n' + quote)
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
  
      /* .then(tpl => (
          jimp.read(imgLogo).then(logoTpl => {
            logoTpl
              .resize(64, 52)
              .opacity(0.8)
              .rotate(-25);
            return tpl.composite(logoTpl, 900, 30, [jimp.BLEND_DESTINATION_OVER, 0.2, 0.2]);
          })
        ) */
  
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
  
      .then(tpl => (tpl.quality(100).write(imgExported)))
  
      .then(tpl => {
          console.log('exported file: ' + imgExported);
          return imgExported;
      })
  
      .catch(err => {
          console.error(err);
      });
  }
}


