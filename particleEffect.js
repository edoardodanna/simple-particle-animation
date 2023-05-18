// Constants and global variables
const retinaIndex = window.devicePixelRatio;
const canvas = document.querySelector("#scene");
const ctx = canvas.getContext("2d", { willReadFrequently: true });
let windowWidth = window.innerWidth;
let mouse = {x:9999, y:9999};
let mouseOverCanvas = true;
let particles = [];
let lastUsedImage = null;
let allInEndPosition = false;
let ww = canvas.scrollWidth;
let wh = canvas.scrollHeight;
let particleRadius = 5 * retinaIndex;
let radius;

// Set up context
ctx.globalCompositeOperation = 'difference';

// Particle constructor
function Particle(x,y){
  this.x =  Math.random()*ww;
  this.y =  Math.random()*wh;
  this.dest = {x : x, y: y};
  this.r =  particleRadius;
  this.vx = (Math.random()-0.5)*20;
  this.vy = (Math.random()-0.5)*20;
  this.accX = 0;
  this.accY = 0;
  this.friction = Math.random()*0.05 + 0.82;

  const colorValue = Math.random() * 80 + 150;
  this.color = `rgb(${colorValue-40},${colorValue},${colorValue+5})`;
}
Particle.prototype.updatePosition = function() {
  this.accX = (this.dest.x - this.x)/100;
  this.accY = (this.dest.y - this.y)/100;
  this.vx += this.accX;
  this.vy += this.accY;
  this.vx *= this.friction;
  this.vy *= this.friction;
  this.x += this.vx;
  this.y +=  this.vy;
  if(Math.abs(this.dest.x-this.x) > 0.1 || Math.abs(this.dest.y-this.y) > 0.1 || this.vx > 0.1 || this.vy > 0.1)
  {
    allInEndPosition = false;
  }

  if(mouseOverCanvas)
  {
    var a = this.x - mouse.x;
    var b = this.y - mouse.y;
    var distance = Math.sqrt(a*a + b*b);
    if(distance<(radius*50 + Math.random()*radius*50)){
      this.accX = (this.x - mouse.x)/(50 + Math.random()*50);
      this.accY = (this.y - mouse.y)/(50 + Math.random()*50);
      this.vx += this.accX;
      this.vy += this.accY;
    }
  }
}
Particle.prototype.render = function() {
  ctx.fillStyle = this.color;
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.r, Math.PI * 2, false);
  ctx.fill();
}

function onMouseMove(e){
  mouse.x = (e.pageX - canvas.offsetLeft) * retinaIndex;
  mouse.y = (e.pageY - canvas.offsetTop) * retinaIndex;
}

function click(e){
  mouse.x = (e.pageX - canvas.offsetLeft) * retinaIndex;
  mouse.y = (e.pageY - canvas.offsetTop) * retinaIndex;
  mouseOverCanvas = true;
  debounce(stopClick, 500)();
}

// Event handling functions
function onMouseMove(e){
  mouse.x = (e.pageX - canvas.offsetLeft) * retinaIndex;
  mouse.y = (e.pageY - canvas.offsetTop) * retinaIndex;
}
function click(e){
  mouse.x = (e.pageX - canvas.offsetLeft) * retinaIndex;
  mouse.y = (e.pageY - canvas.offsetTop) * retinaIndex;
  mouseOverCanvas = true;
  debounce(stopClick, 500)();
}
function stopClick(){
  mouse.x = 9999;
  mouse.y = 9999;
  mouseOverCanvas = false;
}

// Main functions
function initScene(base64Img) {
  lastUsedImage = base64Img
  resetParticles();

  particles = [];
  amount = 0;
  radius = 3 * retinaIndex;
  particleRadius = 4 * retinaIndex;
  if(ww < 500)
  {
    radius = 2 * retinaIndex;
  }
  if(ww < 250 || window.innerWidth < 1000)
  {
    radius = 1.5 * retinaIndex;
  }
  if(window.innerWidth < 500){
    particleRadius = 2 * retinaIndex;
  }
  allInEndPosition = false;

  ww = canvas.width = canvas.scrollWidth * retinaIndex;
  wh = canvas.height = canvas.scrollHeight * retinaIndex;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  imageWidth = ww/2;
  imageHeight = Math.round(imageWidth/1.2);
  if(imageHeight >= 0.9*wh)
  {
    imageHeight = 0.8*wh;
    imageWidth = imageHeight*1.2;
  }

  var image = new Image();
  image.onload = function() {
    ctx.drawImage(image, ww/2-imageWidth/2, wh/2-imageHeight/2,imageWidth,imageHeight);
    var data  = ctx.getImageData(0, 0, ww, wh).data;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = "screen";

    for(var i=0;i<ww;i+=((particleRadius+2)*2)){
      for(var j=0;j<wh;j+=((particleRadius+2)*2)){
        if(data[ ((i + j*ww)*4) + 3] > 0){
          particles.push(new Particle(i,j));
        }
      }
    }
    amount = particles.length;
  }

  image.src = `data:image/png;base64,${lastUsedImage}`;
}

function handleResize() {
  if (windowWidth !== window.innerWidth && lastUsedImage) {
    windowWidth = window.innerWidth;
    initScene(lastUsedImage);
  }
}

function resetParticles() {
  particles = [];
  radius = 3 * retinaIndex;
  particleRadius = 4 * retinaIndex;
  allInEndPosition = false;

  if (ww < 500) {
    radius = 2 * retinaIndex;
  }
  if (ww < 250 || window.innerWidth < 1000) {
    radius = 1.5 * retinaIndex;
  }
  if (window.innerWidth < 500){
    particleRadius = 2 * retinaIndex;
  }
}

function render() {
  if (!allInEndPosition || mouseOverCanvas) {
    if (amount > 0) {
      allInEndPosition = true;
      for (let i = 0; i < amount; i++) {
        particles[i].updatePosition();
      }
      if (!allInEndPosition) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < amount; i++) {
          particles[i].render();
        }
      }
    }
  }
  requestAnimationFrame(render);
}

// Event listeners
window.addEventListener("resize", debounce(handleResize, 200));
window.addEventListener("mousemove", onMouseMove);
window.addEventListener("touchstart", click);
window.addEventListener('DOMContentLoaded', () => {
  requestAnimationFrame(render);
});

// Expose initScene to global scope
window.initScene = initScene;

// Debounce function
function debounce(func, wait) {
  let timeout;
  return function() {
    clearTimeout(timeout);
    timeout = setTimeout(func, wait);
  };
}
