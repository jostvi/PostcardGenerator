// Väntar på att sidan ska bli redo för att köra vårt JavaScript
$(document).ready(function () {
    var post = { 
        quote: "",
        url: ""
        },
        count = 0,
        keyCount = 0;
        imgList = [];

    $("img.bigImage").on("click", function () {
        // Hämtar adressen till bilden som användaren klickade på
        var src = $(this).attr("src");
        // Lägger till en större version av bilden (dold)
        $("body").prepend("<img src='" + src + "' style='position: fixed; width: 60%; top: 20%; left: 20%; z-index: 2000; border: 10px solid #fff; background-color: white; display: none;' id='imageModal'>")
        // Lägger till en svart bakgrund (dold)
        $("body").prepend("<div id='backgroundModal' style='top: 0; bottom: 0; left: 0; right: 0; position: fixed; background-color: rgba(0,0,0,0.7); display:none; z-index: 1999;'></div>");
        // Visar bakgrunden genom en animation
        $("#backgroundModal").fadeIn(500);
        // Visar bilden genom en animation
        $("#imageModal").fadeIn(500);

        // När man klickar på den svarta bakgrunden tas bilden bort
        $("#backgroundModal").on("click", function () {
            $("#backgroundModal").fadeOut(500);
            $("#imageModal").fadeOut(500);
            setTimeout(function () {
                $("#backgroundModal").remove();
                $("#imageModal").remove();
            }, 500);
        })
    })

    $('button#galleryBtn').click(function () {
		$.get('http://localhost:3000/api/gallery', function (data, status) {
			count = 0
			imgList = []
			data.urlList.forEach(function (item) {
				imgList.push(item.url)
			})
			$.preload(imgList);

			document.getElementById("quote").innerHTML = "";
			document.getElementById("author").innerHTML = "";
			document.getElementById("postcard").src = imgList[0];
		})
	})

	$('button#quoteBtn').click(function () {
		$.get('http://localhost:3000/quote', function (data, status) {
			count = 0
			imgList = []
			data.urlList.forEach(function (item) {
				imgList.push(item.url)
			})
			$.preload(imgList);
			post.quote = data.quote + "\n-" + data.author 

			console.log(JSON.stringify(data))
            document.getElementById("quote").innerHTML = data.quote
			document.getElementById("author").innerHTML = ' - ' + data.author;
			document.getElementById("postcard").src = imgList[0];

		})
	})

	$('button#getimg').click(function () {
        let quote = document.getElementById("quote").innerHTML

        console.log(quote)
        $.get('http://localhost:3000/topsecret/images', { quote : quote, keyCount : keyCount },
			function (data, status) {
				count = 0
				imgList = []
				data.urlList.forEach(function (item) {
					imgList.push(item.url)
                })
                keyMax = data.keys
                if(++keyCount == keyMax)
                    keyCount = 0
                console.log(keyMax)
				$.preload(imgList);;
				document.getElementById("preview-image").src = imgList[0];
			})

	})

	$('button#factBtn').click(function () {
		$.get('http://localhost:3000/fact', function (data, status) {
			document.open();
			document.write(data);
			document.close();
			console.log(data)
		})
	})

	$('button#createBtn').click(function () {
        post.quote = document.getElementById("quote").innerHTML + "\n" +
        document.getElementById("author").innerHTML
		post.url = imgList[count];
		console.log(JSON.stringify(post))
		$.post('http://localhost:3000/createPostcard', post, function (data, status) {
			document.getElementById("preview-image").src = data.url;
		})
	})

	$('button#nextBtn').click(function () {
		if (++count == imgList.length)
			count = 0;
		document.getElementById("preview-image").src = imgList[count];
	})
})

$("input")
	.keyup(function () {
		var value = $(this).val();
		$("h3").text(value);
	})
	.keyup();


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

