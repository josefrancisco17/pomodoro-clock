let intervalId;
let progress;

let started = 0;
let paused = 0;

let remainingtime = 0;
let progressValue = 0;
let end = 0;

window.onload = function () {
    $(".time").text("25:00");
}

$(document).on('click', '.playback', function () {
    if (started == 0) {
        start();
    } else {
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

function start() {
    $(".playback").text("pause")
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

    progress = setInterval(() => {
        progressValue = 100 - ((100 * remainingtime) / (1500 * 1000));
        $(".circular-progress").css({
            "background": "conic-gradient(#ff5500 " + progressValue * 3.6 + "deg, #ededed 0deg)"
        });
    }, 1000);
}

function reset() {
    $(".playback").text("start");
    remainingtime = 0;
    progressValue = 0;
    paused = 0;
    started = 0;

    if (intervalId) {
        clearInterval(intervalId);
        clearInterval(progress);
        $(".circular-progress").css({
            "background": "conic-gradient(#ff5500 " + 0 + "deg, #ededed 0deg)"
        });
        $(".time").text("25:00");
    }
}

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

        progress = setInterval(() => {
            progressValue = 100 - ((100 * remainingtime) / (1500 * 1000));
            $(".circular-progress").css({
                "background": "conic-gradient(#ff5500 " + progressValue * 3.6 + "deg, #ededed 0deg)"
            });
        }, 1000);
    }
}