/* Script used by the quote-, fact- and userInput-pages. It contains jQuery functions that handles
user input and a preload function to speed up the image rendering process. */

$(document).ready(function () {
    var post = {
        text: "",
        url: "",
        tag: ""
    },
        count,
        imgList,
        keyCount = 0,
        keyMax = 1,
        postcardUrl = "";

    let text = document.getElementById('text'),
        author = document.getElementById('author')

    if (text.textContent.length > 200) {
        text.style.fontSize = '175%'
        if (author != null)
            author.style.fontSize = '175%'
    }

    /* Function called when the #get-image-button is clicked. It calls the jQuery.get-function 
    with a JSON-object containing the 'text' elements content, together with a 'key' index. 
    When the .get-function returns, there are a number of checks (error, key counter incrementation)
    and assignments before the first image (in the returned image array) is displayed in the preview box */ 
    $('button#get-image').click(function () {
        document.getElementById('get-image').style.display = 'none';
        document.getElementById('spinner1').style.display = 'inline';
        let text = document.getElementById('text').textContent

        $.get('http://localhost:3000/topsecret/images', { text: text, keyCount: keyCount },
            function (data) {
                count = 0
                imgList = []

                if (data === 'error') {
                    alert('Förlåt. Det gick inte att hämta bilder.' +
                        '\nVänligen ladda om sidan eller försök igen.')
                    stopSpinner()
                    document.getElementById('next-image').disabled = true;
                    document.getElementById('save-image').disabled = true;
                    if (++keyCount === keyMax)
                        keyCount = 0
                    return
                } else {
                    if (++keyCount === keyMax)
                        keyCount = 0
                }

                data.urlList.forEach(function (item) {
                    imgList.push(item.url)
                })
                $.preload(imgList)
                keyMax = data.keys

                if (keyMax < 2)
                    document.getElementById('get-image').disabled = true;

                

                document.getElementById('preview-image').src = imgList[0];
                document.getElementById('preview-image').style.visibility = 'visible';
            })
    })

    /* Function called when #create-postcard-button is clicked. The function populates a JSON-object
    with a text-, tag- and url-attribute to be posted with a jQuery.post call. The .post call returns
    a URL (on server-side success) to the created image on the 'cloudinary' cloud storage service. */
    $('button#create-postcard').click(function () {
        document.getElementById('create-postcard').style.display = 'none';
        document.getElementById('spinner2').style.display = 'inline';
        var text = document.getElementById('text').textContent,
            header = document.getElementById('header').textContent;

        if (header === 'Vykort med citat') {
            post.text = text + document.getElementById('author').textContent
            post.tag = "quote"
        } else if (header === 'Vykort med fakta') {
            post.text = text
            post.tag = "fact"
        } else {
            post.text = text
            post.tag = "user"
        }

        post.url = imgList[count];

        $.post('http://localhost:3000/api/v1/postcards/create/', post, function (data) {
            if (data === 'error') {
                alert('Någonting gick FRUKTANSVÄRT FEL...' + 
                '\nVänligen försök igen eller ladda om sidan\n\nHåller tummarna...')
                stopSpinner2()
                return
            }

            postcardUrl = data.url
            document.getElementById('spinner2').style.display = 'none';
            document.getElementById('next-image').disabled = true;
            document.getElementById('get-image').disabled = true;
            document.getElementById('save-image').style.display = 'inline';
            document.getElementById('preview-text').style.visibility = 'hidden'
            document.getElementById('preview-image').src = postcardUrl;

        })

    })
    /* Iterates through the image array when #next-image is clicked and shows the next image
    in the preview box */
    $('button#next-image').click(function () {
        if (++count == imgList.length)
            count = 0;
        document.getElementById("preview-image").src = imgList[count];
    })
    /* Calls the saveImage(p)-function (javascript.js) and reloads the page */
    $('button#save-image').click(function () {
        saveImage(postcardUrl)
        location.reload()
    })
})

/* Mirrors the text in the 'input'-field to the text element in the preview box */
$("input").keyup(function () {
    var value = $(this).val();
    $("h3").text(value);
}).keyup();

/* 3rd-party function that preloads the image array for faster loading when #next-image is clicked */
jQuery.preload = function (array) {
    var length = array.length,
        document = window.document,
        body = document.body,
        isIE = 'fileSize' in document,
        object;
    while (length--) {
        if (isIE) {
            new Image().src = array[length];
            continue;
        }
        object = document.createElement('object');
        object.data = array[length];
        object.width = object.height = 0;
        body.appendChild(object);
    }
}