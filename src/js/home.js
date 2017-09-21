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
  
  /** Iterate over all shapes to draw, check bounce, and move next step **/
  for (let i = 0; i < numShapes; i++) {
    var tempShape = shapes[i];
  
    /** draw and fill at current position **/
    drawShape(tempShape);
  
    /** move to next time step **/
    tempShape.move();
    tempShape.accelerate();
    
    /** check border and collision bounce **/
    tempShape.checkBounce();
    for (let j = i + 1; j < numShapes; j++) {
      if (checkOverlap(tempShape, shapes[j])) {
        collide(tempShape, shapes[j]);
      }
    }
    
  }
}

function drawShape(tempShape) {
  context.fillStyle = tempShape.fillColor;
  context.beginPath();
  context.arc(tempShape.x, tempShape.y, tempShape.radius, 0, Math.PI * 2);
  context.closePath();
  context.fill();
}

/** constructor function for shape unit **/
var ShapeUnit = function (x, y, radius) {
  var [r, g, b] = [
    Math.floor(getRandomInRange(0, 255)),
    Math.floor(getRandomInRange(0, 255)),
    Math.floor(getRandomInRange(0, 255))
  ];
  var fillColor = 'rgb(' + r + ',' + g + ',' + b + ')';
  var vx = getRandomInRange(2, myCanvas.width / 200);
  var vy = getRandomInRange(3, myCanvas.height / 200);
  var a = 0;
  var mass = Math.pow(radius, 3);
  
  return {
    x,
    y,
    radius,
    fillColor,
    vx,
    vy,
    a,
    mass,
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
  return d_square < Math.pow(shape1.radius + shape2.radius, 2);
}

function getRandomPosition(radius) {
  const {width, height} = myCanvas;
  return [getRandomInRange(radius, width), getRandomInRange(radius, height)]
}

function getRandomInRange(min, max) {
  return min + (max - min) * Math.random();
}

function collide(shape1, shape2) {
  var dCenter = shape1.radius + shape2.radius;
  var dx = shape2.x - shape1.x;
  var dy = shape2.y - shape1.y;
  var theta = Math.atan2(dy, dx);
  var sin = Math.sin(theta);
  var cos = Math.cos(theta);
  
  /** translate to new coordinate system with shape1 center as original point and **/
  shape1.x_ = 0;
  shape1.y_ = 0;
  shape2.x_ = dCenter;
  shape2.y_ = 0;
  
  /** rotate shapes to a new axis along their centers;
   * the velocity variables below are the projections of their original velocities on the rotated axis **/
  shape1.vx_ = getVx_(shape1);
  shape1.vy_ = getVy_(shape1);
  shape2.vx_ = getVx_(shape2);
  shape2.vy_ = getVy_(shape2);
  
  /** exchange velocity along x_ axis */
  shape1.vx_ = -shape1.vx_;
  shape2.vx_ = -shape2.vx_;
  
  /** avoid shapes from stick together after collision */
  // shape2.x = shape1.x_ + shape1.radius + shape2.radius;
  shape1.x = getX(shape1);
  shape1.y = getY(shape1);
  shape2.x = getX(shape2);
  shape2.y = getY(shape2);
  
  /** convert velocities along (x_,y_) back to the (x,y) axis */
  shape1.vx = getVx(shape1);
  shape1.vy = getVy(shape1);
  shape2.vx = getVx(shape2);
  shape2.vy = getVy(shape2);
  
  function getX(shape) {
    return shape.x + (shape.x_ * cos - shape.y_ * sin);
  }
  
  function getY(shape) {
    return shape.y + (shape.y_ * cos + shape.x_ * sin);
  }
  
  function getVx_(shape) {
    return shape.vx * cos + shape.vy * sin;
  }
  
  function getVy_(shape) {
    return shape.vy * cos - shape.vx * sin;
  }
  
  function getVx(shape) {
    return shape.vx_ * cos + shape.vy_ * sin;
  }
  
  function getVy(shape) {
    return shape.vy_ * cos + shape.vx_ * sin;
  }
  
}