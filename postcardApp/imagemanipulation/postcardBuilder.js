var fs = require('fs');
var text2png = require('text2png');
var jimp = require('jimp');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dqhlic2nx',
    api_key: '922488389614978',
    api_secret: 'V3uoIVVMor9OcTrsxwikdc5VkX4'
  });

function createTextImage(text) {
    return new Promise ((resolve, reject) => {
        var broken = text.replace(/(.{30}[^ ]* )/g, "$1\n");
        fs.writeFileSync('imagetext.png', text2png(broken, {
            font: '48px Futura',
            color: 'teal',
            backgroundColor: 'transparent',
            lineSpacing: 10,
            padding: 20,
            textAlign: 'center',
        }))
        resolve("Success")
    })
    .catch(err => {
        console.error(err);
    });
};

function scaleText() {
    jimp.read('imagetext.png')
    .then (test => {
        return test
            .scaleToFit(720,500)
            .write('finaltext.png');
    })
  .catch(err => {
    console.error(err);
  });
}

function manipulateImage(url) {
    jimp.read(url)
    .then(image => {
        return image
            .resize(1024, 768)
            .quality(60)
            .brightness(0.5)
            .write('finalimage.png'); // save
  })
  .catch(err => {
    console.error(err);
  });
}
 
const buildPostcard = function buildPostcard() {
    return new Promise ((resolve, reject) => {
        var images = ['finalimage.png', 'finaltext.png']
        var jimps = []

        for (var i = 0; i < images.length; i++) {
        jimps.push(jimp.read(images[i]));
        }

        Promise.all(jimps).then(function(data) {
        return Promise.all(jimps);
        }).then(function(data) {
        data[0].composite(data[1], 170,200)
        data[0].write('postcard.png', function() {
        console.log("Postcard created, yay!")
    })
    resolve("Success, postcard created")
})
.catch(err => {
    console.error(err);
});
    
});
};

const buildPostcardS = function buildPostcardS() {
    return new Promise ((resolve, reject) => {
    var images = ['finalimage.png', 'finaltext.png']
    var jimps = []

    for (var i = 0; i < images.length; i++) {
    jimps.push(jimp.read(images[i]));
    }

    Promise.all(jimps).then(function(data) {
    return Promise.all(jimps);
    }).then(function(data) {
    data[0].composite(data[1], 170,350)
    data[0].write('postcard.png', function() {
        console.log("Postcard created, yay!")
    })
    resolve("Success, postcard created")
})
.catch(err => {
    console.error(err);
});
    });
};

const buildPostcardL = function buildPostcardL() {
    return new Promise ((resolve, reject) => {
    var images = ['finalimage.png', 'finaltext.png']
    var jimps = []

    for (var i = 0; i < images.length; i++) {
    jimps.push(jimp.read(images[i]));
    }

    Promise.all(jimps).then(function(data) {
    return Promise.all(jimps);
    }).then(function(data) {
    data[0].composite(data[1], 170,125)
    data[0].write('postcard.png', function() {
        console.log("Postcard created, yay!")
    })
    resolve("Success, postcard created")
})
.catch(err => {
    console.error(err);
});
    });
};

/* const deleteImgs = function deleteImgs() {
    fs.unlink(('finalimage.png', (err) => {
        if (err) throw err;
        console.log('Image deleted')
    }))
    fs.unlink(('finaltext.png', (err) => {
        if (err) throw err;
        console.log('Image deleted')
    }))
    fs.unlink(('imagetext.png', (err) => {
        if (err) throw err;
        console.log('Image deleted')
    }))
}; */

function postcardBuilder(text, url) {
    return new Promise ((resolve, reject) => {
        createTextImage(text);
        length = text.length;
        console.log(length)
        scaleText();
        manipulateImage(url);
        //let results = await Promise.all //skicka in array av metodanrop --> kolla detta
        
        if (length < 100) {
            setTimeout(buildPostcardS, 500),
            console.log('Built a card with less than 100 characters')
        }
        else if (length > 300) {
            setTimeout(buildPostcardL, 500)
            console.log('Built a card with more than 300 characters')
        }
        else {
        setTimeout(buildPostcard, 500);
        }
        resolve("Success")
    })
   
    .catch((error) => {
        console.log(error)
      })

    .then(res => {
        console.log(res)
        cloudinary.uploader.upload('postcard.png', function (error, result) {
                //url som returneras kan användas för att komma åt bilden
            //resolve(result.url)
        if (error) {
            console.log(error)
        }
        })
        
    })
    .catch(err => {
    console.error(err);
    });

    
}

//bara test, ska kommenteras bort sen
var url = 'https://res.cloudinary.com/dqhlic2nx/image/upload/v1578609199/sample.jpg'
var text = "Nam quis nulla. Integer malesuada. In in enim a arcu imperdiet malesuada. Sed vel lectus. Donec odio urna, tempus molestie, porttitor ut, iaculis quis, sem. Phasellus rhoncus. Aenean id metus id velit ullamcorper pulvinar. Vestibulum fermentum tortor id mi. Pellentesque ipsum. Nulla non arcu lacinia neque faucibus fringilla."

postcardBuilder(text, url)
//module.exports.postcardBuilder = postcardBuilder

