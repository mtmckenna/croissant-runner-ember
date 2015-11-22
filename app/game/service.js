import Ember from 'ember';
import Croissant from './croissant';
import SpriteEmitter from './sprite-emitter';

export default Ember.Service.extend({
  initializedAlready: false,

  configureGame(canvas) {
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');
    this.configureCanvas({ width: 320, height: 240 });

    var AudioContext = window.AudioContext || window.webkitAudioContext;
    this.audioContext = new AudioContext();

    this.croissant = new Croissant(this.context, this.audioContext);
    this.spriteEmitter = new SpriteEmitter(this.context);
    this.configureEventListeners();

    if (!this.initializedAlready) {
      this.drawCounter = 0;
      this.score = 0;
      this.hiScore = 0;
      this.userHasInteracted = false;
      this.gameOver = false;
      this.initializedAlready = true;
    }
  },

  setHiScore(score) {
    if (score > this.hiScore) {
      this.hiScore = score;
    }
  },

  configureCanvas(dimensions) {
    this.canvas.style.backgroundColor = '#66ccff';
    this.canvas.width  = dimensions.width;
    this.canvas.height = dimensions.height;
  },

  configureEventListeners() {
    this.resetGame = this._resetGame.bind(this);
    this.prepareMobileAudio = this._prepareMobileAudio.bind(this);
    this.jump = this._jump.bind(this);
  },

  addEventListeners() {
    window.addEventListener('keydown', this.resetGame, true);
    window.addEventListener('click', this.resetGame, true);
    window.addEventListener('touchstart', this.resetGame, true);
    window.addEventListener('touchend', this.prepareMobileAudio, true);

    window.addEventListener('keydown', this.jump, false);
    window.addEventListener('mousedown', this.jump, false);
    window.addEventListener('touchstart', this.jump, false);
  },

  removeEventListeners() {
    window.removeEventListener('keydown', this.resetGame, true);
    window.removeEventListener('click', this.resetGame, true);
    window.removeEventListener('touchstart', this.resetGame, true);
    window.removeEventListener('touchend', this.prepareMobileAudio, true);

    window.removeEventListener('keydown', this.jump, false);
    window.removeEventListener('mousedown', this.jump, false);
    window.removeEventListener('touchstart', this.jump, false);
  },

  _jump() {
    this.croissant.jump();
  },

  // iOS web audio is such misery.
  // https://paulbakaus.com/tutorials/html5/web-audio-on-ios/
  _prepareMobileAudio() {
    if (!this.userHasInteracted) {

      var buffer = this.audioContext.createBuffer(1, 1, 22050);
      var source = this.audioContext.createBufferSource();

      source.buffer = buffer;
      source.connect(this.audioContext.destination);
      source.start(0);

      this.croissant.addAudio(this.audioContext);
      this.userHasInteracted = true;
    }
  },

  _resetGame() {
    if (this.gameOver) {
      this.spriteEmitter.deleteAllSprites();
      this.score = 0;
      this.gameOver = false;
      this.croissant.napAudio.stop();
    }
  },

  checkCollisions() {
    this.checkPizzaCollisions();
    this.checkCatBedCollisions();
  },

  checkPizzaCollisions() {
    var pizzas = this.spriteEmitter.pizzasThatSpriteOverlaps(this.croissant);
    this.spriteEmitter.deleteSprites(pizzas);
    this.score += pizzas.length;

    pizzas.forEach(() => {
      this.croissant.pizzaAudio.play();
    });
  },

  checkCatBedCollisions() {
    var catBeds = this.spriteEmitter.catBedsThatSpriteOverlaps(this.croissant);
    if (catBeds.length) {
      this.goToGameOver(catBeds[0]);
    }
  },

  goToGameOver(catBed) {
    catBed.switchToSleepingCroissantImage();
    this.croissant.napAudio.play();
    this.drawWorld();
    this.gameOver = true;
    this.setHiScore(this.score);
  },

  update() {
    if (this.gameOver) { return; }
    this.spriteEmitter.update();
    this.croissant.update();
    this.checkCollisions();
  },

  drawGround() {
    this.context.fillStyle = '#4f8f00';
    this.context.fillRect(0, 220, 320, 20);
  },

  drawScore() {
    this.context.fillStyle = '#4f8f00';
    this.context.font = '15px "Lucida Console", Monaco, monospace';
    this.context.fillText(`${this.score} Pizzas`, 10, 25);
    this.context.fillText(`Hi Score: ${this.hiScore}`, 195, 25);
  },

  drawWorld() {
    this.context.clearRect(0, 0, 320, 240);
    this.drawGround();
    this.spriteEmitter.draw();
    this.drawScore();
  },

  draw() {
    if (this.gameOver) { return; }
    this.drawCounter += 1;
    this.drawWorld();
    this.croissant.draw();
  }

});
