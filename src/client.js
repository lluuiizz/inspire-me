const socket = io()

$(document).ready(function() {
    $(".center").hide();
    $("h1").hide();
    $("#field").hide();
    $(".center").slideDown(1000);
    $("h1").fadeIn(1500);
    $("#field").fadeIn(1500);

    socket.on("initLifePoints", (lifePoints)=>{
        var i
        for (i = 0; i < lifePoints; i++) {
            $(".lifePoints").prepend("<img id ='hearth" + i + "'src='/images/hearth.png' alt='lifePoints'>\n");
        }
    })

    socket.on("changeLifePoints", (lifePoints)=>{
        $("#hearth" + lifePoints).fadeOut(500)
    })

    //  Change Always receives the event phrase
    socket.on('phrase', (phrase, category)=>{
        $("#phrase").html(phrase)
        $("#category").html(category)

    })
    socket.on('changeScore', (score, max) => {
        $("#score").html(`${score} / ${max}`)
    })
   socket.on('win', ()=>{
        $(".center").hide(1500);
        $("#field").hide(1500);
        $("h1").slideUp(0)
        $("h1").slideDown(2000)
        $("h1").text("Você Venceu!")
        $("h1").fadeIn(5000)

    })
    socket.on('lose', () => {
        $(".center").hide(1500);
        $("#field").hide(1500);
        $("h1").slideUp(0)
        $("h1").slideDown(2000)
        $("h1").text("Você Perdeu!")
        $("h1").fadeIn(5000)
    })
})


function submitAnswear(element) {

    answear = element.value
    element.value = ""

    socket.emit('answear', answear)
}

function keyPress(e) {
    var keynum;

    if (window.event) {
        // IE
        keynum = e.keyCode;
    } else if (e.which) {
        // Netscape/Firefox/Opera
        keynum = e.which;
    }

    if (keynum == 13) {
        // 13 == enter
        let element = document.getElementById('field');
        submitAnswear(element)
    }
}
