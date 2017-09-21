'use strict';

var myCanvas = document.querySelector('#myCanvas');
var context = myCanvas.getContext('2d');
window.addEventListener('resize', initializeCanvas);

initializeCanvas();

function initializeCanvas() {
  myCanvas.width = window.innerWidth;
  myCanvas.height = window.innerHeight;
}

var fps = 100;
var animationId;
var shapes;

document.body.addEventListener('click', (e) => {
  var dataPlay = e.target.getAttribute('data-play');
  if (!dataPlay) return;
  if (dataPlay === '1' && !animationId) {
    animationId = setInterval(animate, 1000 / fps);
  } else if (dataPlay === '0') {
    animationId = clearInterval(animationId);
  }
});


function animate() {
  context.clearRect(0, 0, myCanvas.width, myCanvas.height);
  shapes = shapes || initShapes(5);
  
  for (let i = 0; i < shapes.length; i++) {
    var tempShape = shapes[i];
    if (tempShape.x <= 0) {
      tempShape.vx = Math.abs(tempShape.vx);
    } else if (tempShape.x + tempShape.width >= myCanvas.width) {
      tempShape.vx = -Math.abs(tempShape.vx);
    }
    if (tempShape.y <= 0) {
      tempShape.vy = Math.abs(tempShape.vy);
    } else if (tempShape.y + tempShape.height >= myCanvas.height) {
      tempShape.vy = -Math.abs(tempShape.vy);
    }
    tempShape.x += tempShape.vx;
    tempShape.y += tempShape.vy;
    context.fillStyle = tempShape.fillColor;
    context.fillRect(tempShape.x, tempShape.y, tempShape.width, tempShape.height);
  }
}

var Shape = function (x, y, minSize = 20, maxSize = 50) {
  var width = minSize + Math.random() * ( maxSize - minSize);
  var height = minSize + Math.random() * ( maxSize - minSize);
  var [r, g, b] = [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)];
  var fillColor = `rgb(${r},${g},${b})`;
  var vx = Math.floor(1 + Math.random() * myCanvas.width / 200);
  var vy = Math.floor(2 + Math.random() * myCanvas.height / 200);
  return {
    x,
    y,
    width,
    height,
    fillColor,
    vx,
    vy,
  }
};

function initShapes(number = 5) {
  var shapes = [];
  
  for (let i = 0; i < number; i++) {
    var [randomX, randomY] = [Math.floor(Math.random() * innerWidth / 2), Math.floor(Math.random() * innerHeight)];
    shapes.push(new Shape(randomX, randomY))
  }
  
  return shapes;
}