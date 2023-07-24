var intervalId;
var started = 0;
var paused = 0;
var remainingtime = 0;

window.onload = function () {
    test();
    $(".time").text("30:00");
}

$(document).on('click', '.button-playback', function () {
    if (started == 0) {
        reset()
    } else if (started == 1) {
        if (paused == 0) {
            pause();
        } else {
            resume();
        }
    }
});


$(document).on('click', '.button-reset', function () {
    reset();
});


function pause() {
    paused = 1;
    $(".button-playback").text("resume");
    clearInterval(intervalId);
}

function resume() {
    paused = 0;
    $(".button-playback").text("pause");
    if (remainingtime > 0) {
        end = new Date(Date.now() + remainingtime);
        intervalId = setInterval(function () {
            var now = new Date().getTime();
            var distance = end - now;
            remainingtime = distance;
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);
            var text = minutes + ":" + seconds;
            $(".time").text(text);

            if (distance < 0) {
                clearInterval(intervalId);
                $(".time").text("00:00");
            }
        }, 1000);
    }
}

function reset() {
    $(".button-playback").text("pause");
    clearInterval(intervalId);
    remainingtime = 0;
    paused = 0;
    started = 1;
    if (intervalId) {
        clearInterval(intervalId);
    }
    var end = new Date(Date.now());
    end.setMinutes(end.getMinutes() + 30);
    end.setSeconds(end.getSeconds() + 1);

    intervalId = setInterval(function () {
        var now = new Date().getTime();
        var distance = end - now;
        remainingtime = distance;
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        var text = minutes + ":" + seconds;
        $(".time").text(text);

        if (distance < 0) {
            clearInterval(intervalId);
            $(".time").text("00:00");
        }
    }, 1000);
}


function test() {
    x = setInterval(function () {
        console.log("Started: " + started);
        console.log("Paused: " + paused);
        console.log("Remainingtime: " + remainingtime);
    }, 1000);
}