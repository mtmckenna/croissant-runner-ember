require('../css/app.css');
import Game from './game';

var canvas = document.createElement('canvas');
var game = new Game(canvas);
var animReq;

document.body.appendChild(canvas);

function main() {
  animReq = window.requestAnimationFrame(main);
  game.update();
  game.draw();
}

function cancelAnimationRequest(e) {
  if (e.keyCode === 67) {
    window.cancelAnimationFrame(animReq);
  }
}

function resizeCanvas() {
  var width = window.innerWidth;
  var height = window.innerHeight;
  var canvasClass = 'tall-canvas';

  if (width > height) {
    canvasClass = 'wide-canvas';
  }

  canvas.className = canvasClass;
}

window.addEventListener('keydown', cancelAnimationRequest, false);
window.addEventListener('resize', resizeCanvas, false);

resizeCanvas();
main();
