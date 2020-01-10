function saveImage() {
    var a = document.createElement('a');
    imgurl = document.getElementById("img").src
    a.href = imgurl;
    a.download = "postcard.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
