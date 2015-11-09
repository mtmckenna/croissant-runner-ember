export default class {
  constructor(type, context, startingPosition, size, velocity) {
    this.type = type;
    this.context = context;
    this.pos = startingPosition;
    this.size = size;
    this.vel = { x: velocity.x, y: velocity.y };

    this.image = this.createImage(type);
    this.drawCounter = 0;
    this._currentFrame = 0;
    this.borderWidth = 2;
  }

  createImage(type) {
    var image = new Image();
    image.src = `../images/${type}.png`;
    return image;
  }

  get currentFrame() {
    if (!(this.drawCounter % 10)) {
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
    this.pos.x = Math.floor(this.pos.x + this.vel.x);
    this.pos.y = Math.floor(this.pos.y + this.vel.y);
  }

  draw() {
    this.drawCounter += 1;

    this.context.drawImage(this.image,
                           this.currentFrame * (this.size.width + this.borderWidth), 0,
                           this.size.width, this.size.height,
                           this.pos.x, this.pos.y,
                           this.size.width, this.size.height);
  }

}
