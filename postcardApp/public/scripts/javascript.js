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
//översätt detta till jquery så att man kan utnyttja data.url
function saveImage() {
    
    var a = document.createElement('a');
    imgurl = data.url//document.getElementById("preview-image").src
    a.href = imgurl;
    a.target="_blank"
    a.download = "postcard.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
/* 
function changeButton() {
    document.getElementById("create-postcard").style.display = 'none';
    document.getElementById("save-image").style.display = 'inline'

} */
