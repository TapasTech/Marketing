'use strict';

var myCanvas = document.querySelector('#myCanvas');
var context = myCanvas.getContext('2d');
window.addEventListener('resize', initializeCanvas);

initializeCanvas();

function initializeCanvas() {
  myCanvas.width = window.innerWidth;
  myCanvas.height = window.innerHeight;
  fillCanvasBackground();
}

var fps = 60;
var animationId;
var shapes;
var numShapes = 10;

document.body.addEventListener('click', function (e) {
  var dataPlay = e.target.getAttribute('data-play');
  if (!dataPlay) return;
  if (dataPlay === '1' && !animationId) {
    animationId = setInterval(animate, 1000 / fps);
  } else if (dataPlay === '0') {
    animationId = clearInterval(animationId);
  } else if (dataPlay === '2') {
    clearCanvas();
    animationId = clearInterval(animationId);
    shapes = undefined;
  }
});

function fillCanvasBackground() {
  context.fillStyle = '#000';
  context.fillRect(0, 0, myCanvas.width, myCanvas.height);
}

function clearCanvas() {
  context.clearRect(0, 0, myCanvas.width, myCanvas.height);
  fillCanvasBackground();
}

function animate() {
  clearCanvas();
  shapes = shapes || initShapes(numShapes);
  
  for (let i = 0; i < numShapes; i++) {
    var tempShape = shapes[i];
    tempShape.checkBounce();
    tempShape.move();
    tempShape.accelerate();
    
    for (let j = i + 1; j < numShapes; j++) {
      if (checkOverlap(tempShape, shapes[j])) {
        // collision equation
        [tempShape.vx, shapes[j].vx] = [shapes[j].vx, tempShape.vx];
        [tempShape.vy, shapes[j].vy] = [shapes[j].vy, tempShape.vy];
      }
    }
    // draw and fill
    context.fillStyle = tempShape.fillColor;
    context.beginPath();
    context.arc(tempShape.x, tempShape.y, tempShape.radius, 0, Math.PI * 2);
    context.closePath();
    context.fill();
  }
}

// constructor function for shape unit
var ShapeUnit = function Shape(x, y, radius = 20) {
  var [r, g, b] = [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)];
  var fillColor = 'rgb(' + r + ',' + g + ',' + b + ')';
  var vx = Math.random() * myCanvas.width / 200;
  var vy = Math.random() * myCanvas.height / 200;
  var a = 0;
  return {
    x,
    y,
    radius,
    fillColor,
    vx,
    vy,
    a,
    checkBounce: function () {
      if (this.x < this.radius || this.x + this.radius > myCanvas.width) {
        this.vx = this.x < this.radius ? Math.abs(this.vx) : -Math.abs(this.vx);
      }
      if (this.y < this.radius || this.y + this.radius > myCanvas.height) {
        this.vy = this.y < this.radius ? Math.abs(this.vy) : -Math.abs(this.vy);
      }
    },
    move: function () {
      this.x = this.x + this.vx;
      this.y = this.y + this.vy;
    },
    accelerate: function () {
      this.vx = this.vx + Math.sign(this.vx) * this.a;
      this.vy = this.vy + Math.sign(this.vy) * this.a;
    }
  };
};

function initShapes(number) {
  var shapes = [], randomX, randomY, newShape, posAvailable;
  var radius = 20;
  while (shapes.length < number) {
    [randomX, randomY] = getRandomPosition(radius);
    newShape = new ShapeUnit(randomX, randomY, radius);
    posAvailable = true;
    for (let j = 0; j < shapes.length; j++) {
      if (checkOverlap(newShape, shapes[j])) {
        posAvailable = false;
      }
    }
    posAvailable && shapes.push(newShape);
  }
  return shapes;
}

function checkOverlap(shape1, shape2) {
  var d_square = Math.pow(shape1.x - shape2.x, 2) + Math.pow(shape1.y - shape2.y, 2);
  if (d_square < Math.pow(shape1.radius + shape2.radius, 2)) {
    console.log('collision!');
    return true;
  } else {
    return false;
  }
}

function getRandomPosition(radius) {
  const {width, height} = myCanvas;
  return [radius + Math.random() * (width - radius), radius + Math.random() * (height - radius)]
}