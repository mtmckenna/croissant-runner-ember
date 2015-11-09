import Croissant from './croissant';
import SpriteEmitter from './sprite-emitter';

export default class {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');
    this.configureCanvas({ width: 320, height: 240 });

    this.croissant = new Croissant(this.context);
    this.spriteEmitter = new SpriteEmitter(this.context);

    this.drawCounter = 0;
    this.score = 0;
    this._hiScore = 0;
    this.gameOver = false;

    this.addInputListeners();
  }

  set hiScore(score) {
    if (score > this.hiScore) {
      this._hiScore = score;
    }
  }

  get hiScore() {
    return this._hiScore;
  }

  configureCanvas(dimensions) {
    this.canvas.style.backgroundColor = '#66ccff';
    this.canvas.width  = dimensions.width;
    this.canvas.height = dimensions.height;
  }

  addInputListeners() {
    window.addEventListener('keydown', this.resetGame.bind(this), false);
    window.addEventListener('touchstart', this.resetGame.bind(this), false);
  }

  resetGame() {
    if (this.gameOver) {
      this.spriteEmitter.deleteAllSprites();
      this.score = 0;
      this.gameOver = false;
    }
  }

  checkCollisions() {
    this.checkPizzaCollisions();
    this.checkCatBedCollisions();
  }

  checkPizzaCollisions() {
    var pizzas = this.spriteEmitter.pizzasThatSpriteOverlaps(this.croissant);
    this.spriteEmitter.deleteSprites(pizzas);
    this.score += pizzas.length;
  }

  checkCatBedCollisions() {
    var catBeds = this.spriteEmitter.catBedsThatSpriteOverlaps(this.croissant);
    if (catBeds.length) {
      this.goToGameOver(catBeds[0]);
    }
  }

  goToGameOver(catBed) {
    catBed.switchToSleepingCroissantImage();
    this.drawWorld();
    this.gameOver = true;
    this.hiScore = this.score;
  }

  update() {
    if (this.gameOver) { return; }
    this.spriteEmitter.update();
    this.croissant.update();
    this.checkCollisions();
  }

  drawGround() {
    this.context.fillStyle = '#4f8f00';
    this.context.fillRect(0, 220, 320, 20);
  }

  drawScore() {
    this.context.fillStyle = '#4f8f00';
    this.context.font = '15px "Lucida Console", Monaco, monospace';
    this.context.fillText(`${this.score} Pizzas`, 10, 25);
    this.context.fillText(`Hi Score: ${this.hiScore}`, 195, 25);
  }

  drawWorld() {
    this.context.clearRect(0, 0, 320, 240);
    this.drawGround();
    this.spriteEmitter.draw();
    this.drawScore();
  }

  draw() {
    if (this.gameOver) { return; }
    this.drawCounter += 1;
    this.drawWorld();
    this.croissant.draw();
  }
}
