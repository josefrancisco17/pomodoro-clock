var intervalId;
var progress;

var started = 0;
var paused = 0;
var remainingtime = 0;

//start progress
let progressValue = 0;   
let speed = 15000;

//start related
var end = new Date(Date.now() + remainingtime);

window.onload = function () {
    $(".time").text("25:00");
}

$(document).on('click', '.playback', function () {
    if (started == 0) {
        start();
    } else if (started == 1) {
        if (paused == 0) {
            pause();
        } else {
            resume();
        }
    }
});


$(document).on('click', '.reset', function () {
    reset();
});


function pause() {
    paused = 1;
    $(".playback").text("resume");
    clearInterval(intervalId);
    clearInterval(progress);
}

function resume() {
    paused = 0;
    $(".playback").text("pause");
    if (remainingtime > 0) {
        end = new Date(Date.now() + remainingtime);
        intervalId = setInterval(function () {
            var now = new Date().getTime();
            remainingtime = end - now;
            var minutes = Math.floor((remainingtime % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((remainingtime % (1000 * 60)) / 1000);
            if (seconds < 10) {
                seconds = "0" + seconds;
            }
            var text = minutes + ":" + seconds;
            $(".time").text(text);

            if (remainingtime < 0) {
                clearInterval(intervalId);
                $(".time").text("00:00");
            }
        }, 1000);

        speed = 1000;
        progress = setInterval(() => {
            progressValue = 100 - ((100 * remainingtime) / (1500 * 1000)); 
            console.log(progressValue)
            $(".circular-progress").css({"background": "conic-gradient(#ff5500 " + progressValue * 3.6 + "deg, #ededed 0deg)"});
            if(progress == 100){
             clearInterval(progress);
            }    
        }, speed);
    }
}

function start() {
    $(".playback").text("pause");
    clearInterval(intervalId);
    remainingtime = 0;
    paused = 0;
    started = 1;
    if (intervalId) {
        clearInterval(intervalId);
    }
    end = new Date(Date.now());
    end.setMinutes(end.getMinutes() + 25);
    end.setSeconds(end.getSeconds() + 1);

    intervalId = setInterval(function () {
        var now = new Date().getTime();
        remainingtime  = end - now;
        var minutes = Math.floor((remainingtime % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((remainingtime % (1000 * 60)) / 1000);
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        var text = minutes + ":" + seconds;
        $(".time").text(text);

        if (remainingtime < 0) {
            clearInterval(intervalId);
            $(".time").text("00:00");
        }
    }, 1000);

    progressValue = 0;  
    speed = 1000;
    progress = setInterval(() => {
        progressValue = 100 - ((100 * remainingtime) / (1500 * 1000)); 
        console.log(progressValue)
        $(".circular-progress").css({"background": "conic-gradient(#ff5500 " + progressValue * 3.6 + "deg, #ededed 0deg)"});
    }, speed);
}
function reset() {
    $(".playback").text("start");
    clearInterval(intervalId);
    remainingtime = 0;
    paused = 0;
    started = 0;
    if (intervalId) {
        clearInterval(intervalId);
        clearInterval(progress);
        $(".circular-progress").css({"background": "conic-gradient(#ff5500 " + 0 + "deg, #ededed 0deg)"});
        $(".time").text("25:00");
    }
}

