import Ember from 'ember';
import Sprite from './sprite';
import Croissant from './croissant';
import Sun from './sun';
import Moon from './moon';
import SpriteEmitter from './sprite-emitter';
import SoundEffect from './sound-effect';
import { colorLuminance } from './util';
import iosSafeAudioContext from 'npm:ios-safe-audio-context';

export default Ember.Service.extend({
  initializedAlready: false,
  audioEnabled: true,
  paused: false,
  gameOver: false,
  level: null,
  initialBackgroundColor: '#66ccff',
  currentBackgroundColor: '#66ccff',
  cache: { images: {} },
  unscaledDimensions: { width: 320, height: 240 },
  adjustedDimensions: { width: 320, height: 240 },
  yOffset: 0,
  xOffset: 0,

  configureGame(canvas, component) {
    Sprite.prototype.game = this;
    this.canvas = canvas;
    this.component = component;
    this.context = this.canvas.getContext('2d');
    this.configureCanvas(this.unscaledDimensions);

    var AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      this.audioContext = new AudioContext();
    }

    this.configureAudioEffects(this.audioContext);

    this.croissant = new Croissant(this.context, this.adjustedDimensions);
    this.sun = new Sun(this.context, this.adjustedDimensions);
    this.moon = new Moon(this.context, this.adjustedDimensions);
    this.spriteEmitter = new SpriteEmitter(this.context);
    this.spriteEmitter.level = this.level;
    this.configureEventListeners();
    this.configureInitialGameState();
  },

  changeLevel(level) {
    this.level = level;

    if (this.spriteEmitter) {
      this.spriteEmitter.changeLevel(level);
    }
  },

  play() {
    this.paused = false;

    this.gameLoop();
    this.removeEventListeners();
    this.addEventListeners();
  },

  pause() {
    this.paused = true;
    window.cancelAnimationFrame(this.animReq);
    this.animReq =  null;
    this.removeEventListeners();
  },

  gameLoop() {
    this.animReq = window.requestAnimationFrame(this.gameLoop.bind(this));
    this.update();
    this.draw();
  },

  configureInitialGameState() {
    if (this.initializedAlready) { return; }
    this.drawCounter = 0;
    this.score = 0;
    this.userHasInteracted = false;
    this.gameOver = false;
    this.initializedAlready = true;
  },

  configureAudioEffects(audioContext = null) {
    this.audioHash = {
      pizza: new SoundEffect('assets/audio/pizza.wav', audioContext),
      jump: new SoundEffect('assets/audio/jump.wav', audioContext),
      nap: new SoundEffect('assets/audio/nap.wav', audioContext, true)
    };
  },

  resizeCanvasWithViewportDimensions(viewportDimensions) {
    const adjustedDimensions = this.adjustedCanvasDimensionsFromViewportDimensions(viewportDimensions);
    this.configureCanvas(adjustedDimensions);
    this.draw();
  },

  adjustedCanvasDimensionsFromViewportDimensions(viewportDimensions) {
    let adjustedDimensions = null;

    if (viewportDimensions.width > viewportDimensions.height) {
      adjustedDimensions = this.adjustedDimensionsForLandscapeViewport(viewportDimensions);
    } else {
      adjustedDimensions = this.adjustedDimensionsForPortraitViewport(viewportDimensions);
    }

    return adjustedDimensions;
  },

  adjustedDimensionsForPortraitViewport(viewportDimensions) {
    const scaleFactor = viewportDimensions.width / this.unscaledDimensions.width;
    const scaledGameHeight = scaleFactor * this.unscaledDimensions.height;
    const unscaledHeadRoom = (viewportDimensions.height - scaledGameHeight) / scaleFactor;
    const unscaledCanvasWidth = 320;
    const unscaledCanvasHeight = Math.floor(this.unscaledDimensions.height + unscaledHeadRoom);
    const adjustedDimensions = {width: unscaledCanvasWidth, height: unscaledCanvasHeight};

    this.adjustedDimensions = adjustedDimensions;
    this.yOffset = unscaledHeadRoom;
    this.xOffset = 0;

    return adjustedDimensions;
  },

  adjustedDimensionsForLandscapeViewport(viewportDimensions) {
    const scaleFactor = viewportDimensions.height / this.unscaledDimensions.height;
    const scaledGameWidth = scaleFactor * this.unscaledDimensions.width;
    const unscaledLeadingWidth = (viewportDimensions.width - scaledGameWidth) / scaleFactor;
    const unscaledCanvasHeight = 240;
    const unscaledCanvasWidth = Math.floor(this.unscaledDimensions.width + unscaledLeadingWidth);
    const adjustedDimensions = {width: unscaledCanvasWidth, height: unscaledCanvasHeight};

    this.adjustedDimensions = adjustedDimensions;
    this.yOffset = 0;
    this.xOffset = unscaledLeadingWidth;

    return adjustedDimensions;
  },

  configureCanvas(dimensions) {
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
    const didJump = this.croissant.jump();
    if (didJump) { this.playAudio('jump'); }
  },

  // iOS web audio is such misery.
  // https://paulbakaus.com/tutorials/html5/web-audio-on-ios/
  // https://github.com/Jam3/ios-safe-audio-context
  _prepareMobileAudio() {
    if (!this.userHasInteracted) {
      this.audioContext = iosSafeAudioContext();
      this.configureAudioEffects(this.audioContext);
      this.userHasInteracted = true;
    }
  },

  _resetGame() {
    if (!this.gameOver) { return; }

    this.spriteEmitter.deleteAllSprites();
    this.score = 0;
    this.sendGameEvent('updated-pizza-count', this.score);
    this.gameOver = false;
    this.stopAudio('nap');
  },

  playAudio(effectName) {
    if (!this.audioEnabled || !this.audioContext) { return; }
    this.audioHash[effectName].play();
  },

  stopAudio(effectName) {
    this.audioHash[effectName].stop();
  },

  checkCollisions() {
    this.checkPizzaCollisions();
    this.checkCatBedCollisions();
  },

  checkPizzaCollisions() {
    var pizzas = this.spriteEmitter.pizzasThatSpriteOverlaps(this.croissant);
    if (!pizzas.length) { return; }

    this.spriteEmitter.deleteSprites(pizzas);
    this.score += pizzas.length;

    this.sendGameEvent('updated-pizza-count', this.score);

    pizzas.forEach(() => { this.playAudio('pizza'); });
  },

  checkCatBedCollisions() {
    var catBeds = this.spriteEmitter.catBedsThatSpriteOverlaps(this.croissant);
    if (catBeds.length) { this.goToGameOver(catBeds[0]); }
  },

  goToGameOver(catBed) {
    this.sendGameEvent('game-over', this.score);
    catBed.switchToSleepingCroissantImage();
    this.playAudio('nap');
    this.drawWorld();
    this.gameOver = true;
  },

  update() {
    if (this.gameOver) { return; }

    this.spriteEmitter.update();
    this.croissant.update();

    if (this.level === 'demo') { return; }

    this.checkCollisions();
    this.sun.pos.y = this.sun.initialPosition.y + (this.level - 1) * 55;
    this.moon.pos.y = this.moon.initialPosition.y - (this.level - 1) * 55;
    this.currentBackgroundColor = colorLuminance(this.initialBackgroundColor, (this.level - 1) / 5 * -1);
  },

  drawGround() {
    const width = this.adjustedDimensions.width;
    const height = 20;
    const x = 0;
    const y = this.adjustedDimensions.height - height;
    this.context.fillStyle = '#4f8f00';
    this.context.fillRect(x, y, width, height);
  },

  drawWorld() {
    this.context.fillStyle = this.currentBackgroundColor;
    this.context.fillRect(0, 0, this.adjustedDimensions.width, this.adjustedDimensions.height);
    this.canvas.style.backgroundColor = this.currentBackgroundColor;
    this.sun.draw();
    this.moon.draw();
    this.drawGround();
    this.spriteEmitter.draw();
  },

  draw() {
    this.drawCounter += 1;
    this.drawWorld();
    if (!this.gameOver) { this.croissant.draw(); }
  },

  sendGameEvent(eventName, data) {
    if (!this.component) { return; }
    this.component.gameEventReceived(eventName, data);
  }
});
