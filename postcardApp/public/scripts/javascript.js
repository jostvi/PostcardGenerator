window.onload = function() {
    document.getElementById('saveimg').style.display = 'none';
    document.getElementById('createBtn').disabled = true;
    document.getElementById('nextBtn').disabled = true;
  };


function enableButton() {
    document.getElementById('createBtn').disabled = false;
    document.getElementById('nextBtn').disabled = false;
}
function saveImage() {
    var a = document.createElement('a');
    imgurl = document.getElementById("preview-image").src
    a.href = imgurl;
    a.target="_blank"
    a.download = "postcard.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function changeButton() {
    document.getElementById("createBtn").style.display = 'none';
    document.getElementById("saveimg").style.display = 'inline'

}
