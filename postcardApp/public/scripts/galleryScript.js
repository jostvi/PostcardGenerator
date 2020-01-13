$(document).ready(function () {
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
})