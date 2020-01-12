window.onload = function() {
    document.getElementById('save-image').style.display = 'none';
    document.getElementById('create-postcard').disabled = true;
    document.getElementById('next-image').disabled = true;
    document.getElementById('preview-image').style.visibility = 'hidden'
    document.getElementById('spinner1').style.display = 'none';
    document.getElementById('spinner2').style.display = 'none';
  };

function enableButton() {
    document.getElementById('create-postcard').disabled = false;
    document.getElementById('next-image').disabled = false;
}

function saveImage(imgurl) {
    
    var a = document.createElement('a');
    imgurl = imgurl
    a.href = imgurl;
    a.target="_blank";
    a.download = "postcard.jpg";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function stopSpinner() {
    document.getElementById('get-image').style.display = 'inline';
    document.getElementById('spinner1').style.display = 'none';    
}