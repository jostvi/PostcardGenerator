// Väntar på att sidan ska bli redo för att köra vårt JavaScript
$(document).ready(function () {
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
});