//  Get HTML Canvas
document.addEventListener("DOMContentLoaded", loadCanvas);

var m = {
    ym: false,
    xm: true,
    xb: 0,
    yb: 0,
    pm: null,
    xPos: 600 / 2 - 75,
    yPos: 400 - 24
}

function loadCanvas() {
    var canvas = s("canvas");
    var context = canvas.getContext("2d");

    context.clearRect(0, 0, 600, 400);

    canvas.width = 600;
    canvas.height = 400;
    
    canvas.style.width = 400;
    canvas.style.height = 400;

    //background
    context.fillStyle = "#F44336";
    context.fillRect(0, 0, 600, 400);
    
    //ball
    context.fillStyle = "#FFFFFF";
    context.fillRect(m.xb, m.yb, 12, 12);

    //player
    context.fillStyle = "#FFFFFF";
    context.fillRect(m.xPos, m.yPos, 150, 12);

    //listen for keyboard press
    document.addEventListener("keydown", function (e) {
        if (e.keyCode === 37) m.pm = false;
        else if (e.keyCode === 38) m.pm = false;
        else if (e.keyCode === 39) m.pm = true;
        else if (e.keyCode === 40) m.pm = true;
        else m.pm = null;
    });

    //collision detection
    if (m.xb > m.xPos - 12 && m.xb < m.xPos + 150) {
        if (m.yb === m.yPos - 6) {
            m.ym = true;
            s("h6 span").innerHTML = parseInt(s("h6 span").innerHTML) + 1;
        }
    }

    //ball x movement
    if (m.xm === false) {
        if (m.xb === 500 - 12) {
            m.xm = true;
        } else {
            m.xb++;
        }
    } else if (m.xm === true) {
        if (m.xb === 0) {
            m.xm = false;
        } else {
            m.xb--;
        }
    }

    //ball y movement
    if (m.ym === false) {
        if (m.yb === 400 - 12) {
            var score = s("h6 span").innerHTML;
            s("h6").innerHTML = "GAME OVER! Total score: " + score;
            setTimeout(function() {
                window.location.href = window.location;
            }, 3000);
            return;
        } else {
            m.yb++;
        }
    } else if (m.ym === true) {
        if (m.yb === 0) {
            m.ym = false;
        } else {
            m.yb--;
        }
    }

    if (m.pm === false) {
        if (m.xPos !== 0) m.xPos--;
        else m.xPos = 0;
    } else if (m.pm === true) {
        if (m.xPos !== 600 - 150) m.xPos++;
        else m.xPos = 600 - 150;
    }

    setTimeout(loadCanvas, 4);
}

function s(e) {
    return document.querySelector(e);
}