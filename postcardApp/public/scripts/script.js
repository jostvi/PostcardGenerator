$(document).ready(function () {
    var post = {
        text: "",
        url: "",
        tag: ""
    },
        count = 0,
        keyCount = 0,
        keyMax = 0,
        imgList = [],
        postcardUrl = "";

    let text = document.getElementById('text'),
        author = document.getElementById('author')

    /* if (text.textContent.length > 200) {
        text.style.fontSize = '36pt'
        if (author != null)
            author.style.fontSize = '36pt' 
    }*/

    $("img.bigImage").on("click", function () {
        var src = $(this).attr("src");
        $("body").prepend("<img src='" + src + "' style='position: fixed; width: 60%; top: 10%; left: 20%; z-index: 2000; border: 10px solid #fff; background-color: white; display: none;' id='imageModal'>")
        $("body").prepend("<div id='backgroundModal' style='top: 0; bottom: 0; left: 0; right: 0; position: fixed; background-color: rgba(0,0,0,0.7); display:none; z-index: 1999;'></div>");
        $("#backgroundModal").fadeIn(500);
        $("#imageModal").fadeIn(500);
        $("#backgroundModal").on("click", function () {
            $("#backgroundModal").fadeOut(500);
            $("#imageModal").fadeOut(500);
            setTimeout(function () {
                $("#backgroundModal").remove();
                $("#imageModal").remove();
            }, 500);
        })
    });

    $('button#get-image').click(function () {
        document.getElementById('get-image').style.display = 'none';
        document.getElementById('spinner1').style.display = 'inline';
        let text = document.getElementById('text').textContent

        $.get('http://localhost:3000/topsecret/images', { text: text, keyCount: keyCount },
            function (data) {
                count = 0
                imgList = []

                if (data === 'error') {
                    alert('Fel vid hämtning av bild\nVänligen ladda om sidan')
                    stopSpinner()
                    return
                }

                data.urlList.forEach(function (item) {
                    imgList.push(item.url)
                })
                $.preload(imgList)

                if (++keyCount == keyMax)
                    keyCount = 0

                keyMax = data.keys

                if (keyMax == 1)
                    document.getElementById('get-image').disabled = true;

                document.getElementById('preview-image').src = imgList[0];
                document.getElementById('preview-image').style.visibility = 'visible';
            })
    })

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
                alert('Någonting gick fel\nVänligen ladda om sidan')
                return
            }
            postcardUrl = data.url
            document.getElementById('spinner2').style.display = 'none';
            document.getElementById('next-image').disabled = true;
            document.getElementById('get-image').disabled = true;
            document.getElementById('save-image').style.display = 'inline';
            document.getElementById('preview-text').style.visibility = 'hidden'
			document.getElementById('preview-image').src = postcardUrl
			document.getElementById('preview-header').innerHTML = "Ditt vykort";
        })
    })

    $('button#next-image').click(function () {
        if (++count == imgList.length)
            count = 0;
        document.getElementById("preview-image").src = imgList[count];
    })

    $('button#save-image').click(function () {
        saveImage(postcardUrl)
        location.reload()
    })
})


$("input").keyup(function () {
    var value = $(this).val();
    $("h3").text(value);
}).keyup();


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