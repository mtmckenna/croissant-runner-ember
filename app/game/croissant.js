import Sprite from './sprite';
import SoundEffect from './sound-effect';

export default class extends Sprite {
  constructor(canvasContext, audioContext) {
    var path = 'assets/images/croissant.png';
    super(path,
          canvasContext,
          { x: 50, y: 200 },
          { width: 29, height: 32 },
          { x: 0, y: 0 });

    this.gravity = .5;
    this.jumpVelocity = -14;
    this.groundLevel = this.pos.y;

    this.addAudio(audioContext);
    this.addInputListeners();
  }

  addInputListeners() {
    window.addEventListener('keydown', this.jump.bind(this), false);
    window.addEventListener('click', this.jump.bind(this), false);
    window.addEventListener('touchstart', this.jump.bind(this), false);
  }

  addAudio(context) {
    this.jumpAudio = new SoundEffect('assets/audio/jump.wav', context);
    this.pizzaAudio = new SoundEffect('assets/audio/pizza.wav', context);
    this.napAudio = new SoundEffect('assets/audio/nap.wav', context, true);
  }

  jump() {
    if (this.pos.y < this.groundLevel) { return; }
    this.vel.y = this.jumpVelocity;
    this.jumpAudio.play();
  }

  update() {
    this.vel.y = this.vel.y + this.gravity;
    this.pos.y = Math.floor(this.pos.y + this.vel.y);

    if (this.pos.y > this.groundLevel) {
      this.vel.y = 0;
      this.pos.y = this.groundLevel;
    }

    return this.pos;
  }
}
