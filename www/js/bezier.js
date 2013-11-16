var canvas = document.getElementById("myCanvas");
var ct = canvas.getContext("2d");
var counter = 0;
var segment = 0.001;

function Point(x, y) {
    this.x = x;
    this.y = y;
}

var points = new Array;

function drawBezier(context, points) {
    console.log("Draw bezier.")
    context.beginPath();
    for (var t = 0; t < 1; t += segment) {
        context.moveTo(
            Math.pow((1 - t), 3) * points[0].x + 3 * t * Math.pow((1 - t), 2) * points[1].x + 3 * Math.pow((t), 2) * (1 - t) * points[2].x + Math.pow(t, 3) * points[3].x,
            Math.pow((1 - t), 3) * points[0].y + 3 * t * Math.pow((1 - t), 2) * points[1].y + 3 * Math.pow(t, 2) * (1 - t) * points[2].y + Math.pow(t, 3) * points[3].y);
        context.lineTo(
            Math.pow((1 - (t + segment)), 3) * points[0].x + 3 * (t + segment) * Math.pow((1 - (t + segment)), 2) * points[1].x + 3 * Math.pow((t + segment), 2) * (1 - (t + segment)) * points[2].x + Math.pow((t + segment), 3) * points[3].x,
            Math.pow((1 - (t + segment)), 3) * points[0].y + 3 * (t + segment) * Math.pow((1 - (t + segment)), 2) * points[1].y + 3 * Math.pow((t + segment), 2) * (1 - (t + segment)) * points[2].y + Math.pow((t + segment), 3) * points[3].y);
    }
    context.stroke();
}

function drawPoint(context, point) {
    context.fillStyle = "rgb(0, 0, 255)";
    context.fillRect(point.x - 2, point.y - 2, 4, 4);
}

function drawLines(context, points) {
    context.fillStyle = "rgb(0, 255, 0)";
    context.moveTo(points[0].x, points[0].y);
    context.lineTo(points[1].x, points[1].y);
    context.moveTo(points[1].x, points[1].y);
    context.lineTo(points[2].x, points[2].y);
    context.moveTo(points[2].x, points[2].y);
    context.lineTo(points[3].x, points[3].y);
    context.stroke();
}

function getCursorPosition(e) { // for accurate position count
    var x;
    var y;
    /*if (e.pageX || e.pageY) {
      x = e.pageX;
      y = e.pageY;
    }
    else {
      x = e.clientX + document.body.scrollLeft +
           document.documentElement.scrollLeft;
      y = e.clientY + document.body.scrollTop +
           document.documentElement.scrollTop;
    }*/
    x = e.offsetX;
    y = e.offsetY;
    return {
        x: x,
        y: y
    }
}

function getMouse(event) {
    p = getCursorPosition(event);
    points.push(new Point(p.x, p.y));
    drawPoint(ct, points[counter]);
    counter++;
    if (counter == 4) {
        drawLines(ct, points);
        drawBezier(ct, points);
    }
}

function clearCanvas() {
    console.log("Clear canvas.");
    counter = 0;
    points = [];
    ct.clearRect(0, 0, canvas.width, canvas.height);
}

canvas.addEventListener("click", getMouse, false);