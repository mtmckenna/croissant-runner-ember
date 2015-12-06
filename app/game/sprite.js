export default class {
  constructor(path, context, startingPosition, size, velocity) {
    this.path = path;
    this.context = context;
    this.pos = startingPosition;
    this.size = size;
    this.vel = { x: velocity.x, y: velocity.y };

    this.cacheImage(path);
    this.drawCounter = 0;
    this._currentFrame = 0;
    this.borderWidth = 2;
  }

  get adjustedPos() {
    return {
      x: this.pos.x + this.game.xOffset,
      y: this.pos.y + this.game.yOffset
    };
  }

  cacheImage(path) {
    this.game.cache.images[path] = this.game.cache.images[path] || this.createImage(path);
  }

  createImage(path) {
    var image = new Image();
    image.src = path;
    return image;
  }

  get image() {
    return this.game.cache.images[this.path];
  }

  get currentFrame() {
    if ((this.drawCounter % 10) === 0) {
      this._currentFrame = (this._currentFrame + 1) % 2;
    }

    return this._currentFrame;
  }

  intersects(anotherSprite) {
    var r1 = {}, r2 = {};

    r1.left = this.pos.x;
    r1.right = this.pos.x + this.size.width;
    r1.top = this.pos.y;
    r1.bottom = this.pos.y + this.size.height;

    r2.left = anotherSprite.pos.x;
    r2.right = anotherSprite.pos.x + anotherSprite.size.width;
    r2.top = anotherSprite.pos.y;
    r2.bottom = anotherSprite.pos.y + anotherSprite.size.height;

    return !(r2.left > r1.right ||
             r2.right < r1.left ||
             r2.top > r1.bottom ||
             r2.bottom < r1.top);
  }

  update() {
    this.pos.x = this.pos.x + this.vel.x;
    this.pos.y = this.pos.y + this.vel.y;
  }

  draw() {
    this.drawCounter += 1;
    const x = Math.floor(this.adjustedPos.x);
    const y = Math.floor(this.adjustedPos.y);

    this.context.drawImage(this.image,
                           this.currentFrame * (this.size.width + this.borderWidth), 0,
                           this.size.width, this.size.height,
                           x, y,
                           this.size.width, this.size.height);
  }

}
