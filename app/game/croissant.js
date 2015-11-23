import Sprite from './sprite';

export default class extends Sprite {
  constructor(canvasContext, canvasDimensions) {
    const path = 'assets/images/croissant.png';
    super(path,
          canvasContext,
          { x: 50, y: 200 },
          { width: 29, height: 32 },
          { x: 0, y: 0 });

    this.gravity = .5;
    this.groundLevel = this.pos.y;
    this.jumpVelocity = -14;
  }

  jump() {
    if (this.pos.y < this.groundLevel) { return false; }
    this.vel.y = this.jumpVelocity;
    return true;
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
