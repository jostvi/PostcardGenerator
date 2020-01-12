
$(document).ready(function () {
    
    var post = { 
        text: "",
        url: "" ,
        tag: "" },
        count = 0,
        keyCount = 0;
        imgList = [];
        postcardUrl = "";
    
    

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
    })

	$('button#get-image').click(function () {
            document.getElementById('get-image').style.display = 'none';
            document.getElementById('spinner1').style.display = 'inline';

        let text = document.getElementById('text').innerHTML
        $.get('http://localhost:3000/topsecret/images', { text : text, keyCount : keyCount },
			function (data) {
                if(data === 'error')
                    return
				count = 0
				imgList = []
				data.urlList.forEach(function (item) {
                    imgList.push(item.url)   
                })
                keyMax = data.keys
                if(++keyCount == keyMax)
                    keyCount = 0
				$.preload(imgList);
                document.getElementById('preview-image').src = imgList[0];
                document.getElementById('preview-image').style.visibility = 'visible';
            })
            //trodde att detta skulle leda till att spinnern först slutar snurra när bilden faktiskt visas upp, men det funkar ändå inte...
        
    })
    
    
    

	$('button#get-userinput-image').click(function () {
        document.getElementById('get-userinput-image').style.display = 'none';
        document.getElementById('spinner1').style.display = 'inline';
		let userinput = document.getElementById("userinput").value
        $.get('http://localhost:3000/topsecret/images', { text : userinput, keyCount : keyCount },
			function (data, status) {
				count = 0
				imgList = []
				data.urlList.forEach(function (item) {
                    imgList.push(item.url)
                    
                })
                keyMax = data.keys
                if(++keyCount == keyMax)
                    keyCount = 0
				$.preload(imgList);
                document.getElementById("preview-image").src = imgList[0];
                document.getElementById('preview-image').style.visibility = 'visible';
                
            })
            //trodde att detta skulle leda till att spinnern först slutar snurra när bilden faktiskt visas upp, men det funkar ändå inte...

	})

	$('button#create-postcard').click(function () {
        document.getElementById('create-postcard').style.display = 'none';
        document.getElementById('spinner2').style.display = 'inline';
        var text = document.getElementById('text').innerHTML;
            author = document.getElementById('author').innerHTML
        
        if(author != "") {
            post.text = text + "\n" + author
            post.tag = "quote"
        }
        else {
            post.text = text
            post.tag = "fact"
		}
		

        post.url = imgList[count];
        
        console.log(JSON.stringify(post))
        //Ska vi ändra anropet till /api/v1/postcards/create?
		$.post('http://localhost:3000/createPostcard', post, function (data) {
            if(data === 'error')
                    return
            document.getElementById('save-image').style.display = 'inline'
            document.getElementById('spinner2').style.display = 'none';
            document.getElementById('next-image').disabled = true;
            document.getElementById('get-image').disabled = true;
            postcardUrl = data.url
    
        })
        
    })
    
    $('button#save-image').click(function () {
        saveImage(postcardUrl)
    })

	$('button#next-image').click(function () {
		if (++count == imgList.length)
			count = 0;
		document.getElementById("preview-image").src = imgList[count];
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

